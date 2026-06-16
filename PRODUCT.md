# Product: Wordle Helper

## Overview

Wordle Helper is a React application built with Vite that helps users find valid five-letter words from local word lists using pattern matching and letter-based filtering.

The app is fast, minimal, and requires no backend.

## Features Implemented

### Core Search Capabilities

- **Pattern Matching**: Search using 5-letter patterns with fixed letters and dot (`.`) placeholders
  - Example: `a..le` matches words with `a` at position 0 and `le` at positions 3-4
  - Exact matches: `crane` matches only "crane"
  - Placeholders: `.....` matches any 5-letter word

- **Excluded Letters**: Filter out words containing specific letters
  - If a letter is fixed in the pattern, it's allowed only at that position
  - If a letter is not in the pattern, it cannot appear anywhere

- **Included Letters**: Require words to contain specific letters (in any position)
  - Works in combination with pattern and excluded letters

- **Selectable Word Lists**: Choose between two dictionaries via button toggle
  - Official Answers: Curated list of valid Wordle answers
  - Valid Guess List: Larger list of valid 5-letter guesses

### User Interface

- **Compact Design**: Minimal spacing and layout with no explanatory text
- **Quick Controls**:
  - Word list selector (toggle buttons)
  - Pattern input (exactly 5 characters)
  - Excluded letters input
  - Included letters input
  - Search and Clear buttons
- **Results Panel**: Displays match count and word list
- **Error Handling**: Shows validation errors for invalid patterns or overlapping rules
- **Responsive**: Works on desktop and mobile

## Data Source

- Words loaded from local text files (`wordle-answers.txt`, `wordle-valid.txt`)
- Loaded via Vite's raw import at build time
- No backend required

## Technical Implementation

### Architecture

- **React Functional Components**: All components built with hooks
- **Separation of Concerns**:
  - `services/wordListService.js`: Handles word list loading and selection
  - `utils/wordFilter.js`: Pure functions for pattern matching and letter rule evaluation
  - `components/`: UI components (SearchPanel, ResultsPanel)
  - `pages/HomePage.jsx`: Main application logic and state management

### Pattern Matching Logic

- Valid characters: `a-z` (letters) and `.` (placeholder)
- Exactly 5 characters required
- Dot placeholders match any letter at that position
- Fixed letters must match exactly at their position

### Letter Rules

- Included letters must appear somewhere in the word
- Excluded letters cannot appear except where fixed by pattern
- Rules can combine with pattern constraints

### Testing

- Unit tests for all filter functions (19 tests passing)
- Tests cover edge cases: validation, length constraints, rule combinations
- Service tests verify word list loading and selection

## Build & Deployment

- Built with Vite for fast development and minimal bundle size
- Production build: ~92KB gzipped
- No external dependencies beyond React

## Functional Requirements Met

✓ Search words from local text files  
✓ Filter by 5-letter pattern (fixed letters + placeholders)  
✓ Filter by included letters  
✓ Filter by excluded letters (with pattern awareness)  
✓ Show match count  
✓ Show matching words in list  
✓ Allow clearing search  
✓ Handle empty results gracefully  
✓ Select between word lists  
✓ Validate pattern length (exactly 5)  
✓ Validate pattern format (letters and dots only)  
✓ Validate no overlapping included/excluded letters  

## Non-Functional Requirements Met

✓ Minimal, compact UI  
✓ Fast filtering (pure functions, memoized results)  
✓ No unnecessary dependencies  
✓ Clean, readable, maintainable code  
✓ Fully unit tested  
✓ Mobile-responsive design  

## Out of Scope

- Multiplayer features
- Online dictionary lookup
- User accounts
- Game automation
- Backend API
- Persistence/bookmarking