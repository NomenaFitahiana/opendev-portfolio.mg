## Overview

This project uses **Vitest** for both unit and integration testing.

---

## What is tested

### Unit tests

- Auth utilities (bcrypt, security rules)
- Validation schemas (Zod)
- Utility functions

### Integration tests

- Server actions (blog, project, contact, testimonial)
- Safe-action flows
- Query layer (database abstraction)

## What is NOT tested

- UI pages (Next.js app router pages)
- Layout components
- Pure presentation components

---

## Run tests

```bash
pnpm test
```

### Run tests with coverage

```bash
pnpm test run --coverage
```

### Run a specific test file

```bash
pnpm test run src/lib/__tests__/auth-server.test.ts
```

### Run tests by pattern

```bash
pnpm test run -t "auth"
```

### Run tests in a directory

```bash
pnpm test run src/actions/__tests__/
```

### Run component tests (jsdom)

```bash
pnpm test run src/components/
```
