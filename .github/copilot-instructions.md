# Copilot Instructions

## Project Overview

This is a React application built with Vite and JavaScript.

Primary goals:

* Maintain a clean and simple architecture.
* Prefer readability over cleverness.
* Keep components small and focused.
* Follow React best practices.
* Minimize dependencies.

---

## Technology Stack

* React
* Vite
* JavaScript (ES2022+)
* CSS Modules or plain CSS
* npm

Do not introduce TypeScript unless explicitly requested.

---

## Project Structure

Use the following structure:

src/
├── components/
├── pages/
├── hooks/
├── services/
├── utils/
├── assets/
├── styles/
└── App.jsx

Guidelines:

* Reusable UI goes into components.
* Page-level components go into pages.
* API communication goes into services.
* Shared logic goes into hooks.
* Utility functions go into utils.

---

## Coding Standards

### React

* Use functional components only.
* Use hooks instead of class components.
* Prefer composition over inheritance.
* Keep components under 200 lines when possible.
* Extract reusable logic into custom hooks.

### JavaScript

* Use const by default.
* Use let only when reassignment is required.
* Use modern ES syntax.
* Avoid deeply nested logic.
* Prefer early returns.

### Naming

Components:

* UserCard.jsx
* TodoList.jsx

Hooks:

* useAuth.js
* useTodos.js

Services:

* apiService.js
* userService.js

---

## Styling

* Keep styling simple and maintainable.
* Prefer CSS modules or scoped CSS.
* Avoid inline styles unless necessary.
* Ensure responsive design.
* Mobile-first approach.

---

## State Management

Use React state and context first.

Only introduce additional state management libraries if explicitly requested.

---

## API Integration

* Create API clients in services/.
* Keep API calls separate from UI logic.
* Handle loading and error states.
* Use async/await.

---

## Error Handling

* Handle all async errors.
* Provide meaningful user feedback.
* Avoid silent failures.
* Log unexpected errors.

---

## Testing

When creating new functionality:

* Add unit tests where practical.
* Test business logic separately from UI.
* Avoid excessive mocking.

---

## Git Workflow

Before making significant changes:

1. Explain the planned approach.
2. Show affected files.
3. Make focused changes.
4. Avoid unrelated refactoring.

When generating commits:

* Use concise commit messages.
* Follow conventional commits when possible.

Examples:

* feat: add todo management
* fix: handle api timeout
* refactor: simplify user hook

---

## Agent Behavior

When implementing features:

1. Analyze the existing codebase first.
2. Reuse existing patterns.
3. Propose a plan before major changes.
4. Explain architectural decisions.
5. Avoid introducing unnecessary libraries.
6. Run validation and fix errors if possible.
7. Keep solutions production-ready.

If requirements are unclear, ask questions before implementing.

Always prefer maintainable solutions over quick hacks.
