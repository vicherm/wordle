# Product: Wordle Helper

## Overview

Wordle Helper is a small React app that helps users find valid words from a local text file based on a Wordle-style pattern.

The app is intended to be fast, simple, and easy to use.

## Goal

Help the user search a word list and filter candidate words using:

- fixed letters in known positions
- unknown letters represented by placeholders
- excluded letters
- included letters
- optional pattern rules

## Core User Flow

1. User loads or uses the built-in word list.
2. User enters a search pattern.
3. App filters matching words.
4. App displays the matching results immediately.

## Example Patterns

- `a..le` → words with `a` at position 1 and `le` at the end
- `.r...` → words with `r` in position 2
- `crane` → exact match

## Data Source

- Word list is stored in a local text file.
- Each line contains one word.
- The app should not require a backend.

## Functional Requirements

- Search words from a text file or local data file
- Filter by pattern
- Show number of matches
- Show matching words in a list
- Allow clearing the search
- Handle empty results gracefully

## Non-Functional Requirements

- Simple UI
- Fast filtering
- No unnecessary dependencies
- Readable code
- Easy to extend later

## Out of Scope

- Multiplayer features
- Online dictionary lookup
- User accounts
- Game automation
- Backend API

## UX Guidelines

- Keep the interface minimal
- Put the search input at the top
- Show results below the search area
- Make the app work well on mobile and desktop

## Implementation Notes

- Use React functional components
- Use hooks for state and filtering
- Keep word filtering logic separate from UI
- Prefer pure functions for matching logic
- Store the word-matching rules in a reusable utility

## Success Criteria

The project is successful when a user can:

- enter a pattern
- get matching words from the text file
- understand the results quickly
- use the app without confusion