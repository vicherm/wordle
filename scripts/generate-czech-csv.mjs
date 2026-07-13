import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const resourcesDir = path.join(projectRoot, 'src', 'resources');
const jobs = [
  {
    input: path.join(resourcesDir, 'wordle-answers.txt'),
    output: path.join(resourcesDir, 'wordle-answers-cs.csv'),
  },
  {
    input: path.join(resourcesDir, 'wordle-valid.txt'),
    output: path.join(resourcesDir, 'wordle-valid-cs.csv'),
  },
];

const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
const batchArg = process.argv.find((arg) => arg.startsWith('--batch='));
const concurrencyArg = process.argv.find((arg) => arg.startsWith('--concurrency='));
const requestedLimit = limitArg ? Number.parseInt(limitArg.split('=')[1], 10) : null;
const batchSize = batchArg ? Number.parseInt(batchArg.split('=')[1], 10) : 64;
const concurrency = concurrencyArg ? Number.parseInt(concurrencyArg.split('=')[1], 10) : 4;

if (
  Number.isNaN(requestedLimit) ||
  Number.isNaN(batchSize) ||
  Number.isNaN(concurrency) ||
  batchSize <= 0 ||
  concurrency <= 0
) {
  throw new Error('Invalid numeric argument. Use --limit=<n>, --batch=<n>, and --concurrency=<n>.');
}

const csvEscape = (value) => {
  const text = String(value ?? '');

  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
};

const translateBatch = async (words) => {
  const query = words.join('\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=cs&dt=t&q=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'wordle-helper/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Translation request failed with ${response.status}.`);
  }

  const payload = await response.json();
  const translatedText = Array.isArray(payload?.[0])
    ? payload[0].map((segment) => segment?.[0] ?? '').join('')
    : '';
  const translatedWords = translatedText.split('\n');

  if (translatedWords.length !== words.length) {
    throw new Error(
      `Translation count mismatch. Expected ${words.length}, received ${translatedWords.length}.`
    );
  }

  return translatedWords;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const translateWords = async (words) => {
  const translations = [];

  for (let groupStart = 0; groupStart < words.length; groupStart += batchSize * concurrency) {
    const batchEntries = [];

    for (let offset = 0; offset < concurrency; offset += 1) {
      const index = groupStart + offset * batchSize;
      const batch = words.slice(index, index + batchSize);

      if (batch.length === 0) {
        continue;
      }

      batchEntries.push({ index, batch });
    }

    const groupResults = await Promise.all(
      batchEntries.map(async ({ index, batch }) => {
        for (let attempt = 1; attempt <= 3; attempt += 1) {
          try {
            const translatedBatch = await translateBatch(batch);
            return { index, batch, translatedBatch };
          } catch (error) {
            if (attempt === 3) {
              throw error;
            }
          }
        }

        throw new Error('Unreachable retry state.');
      })
    );

    groupResults
      .sort((left, right) => left.index - right.index)
      .forEach(({ index, batch, translatedBatch }) => {
        translations.push(...translatedBatch);
        console.log(`Translated ${Math.min(index + batch.length, words.length)}/${words.length}`);
      });

    await wait(100);
  }

  return translations;
};

const readWords = async (filePath) => {
  const content = await readFile(filePath, 'utf8');
  const words = content
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);

  return requestedLimit ? words.slice(0, requestedLimit) : words;
};

const writeCsv = async (outputPath, words, translations) => {
  const rows = ['word,translation_cs'];

  for (let index = 0; index < words.length; index += 1) {
    rows.push(`${csvEscape(words[index])},${csvEscape(translations[index] ?? '')}`);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${rows.join('\n')}\n`, 'utf8');
};

for (const job of jobs) {
  const words = await readWords(job.input);
  const translations = await translateWords(words);
  await writeCsv(job.output, words, translations);
  console.log(`Wrote ${job.output}`);
}