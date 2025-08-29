# CI/CD Guide

## GitHub Actions
Jobs configurados:
- `lint-and-typecheck` → ESLint e TypeScript
- `test` → Jest e cobertura de testes
- `build` → Next.js build
- `security-scan` → dependency review e pnpm audit

## Status Checks
- Todos os jobs devem passar antes de qualquer merge em `develop` ou `main`.
- Branch `main` protegida para impedir merges diretos e force push.

## Workflow
- PR criado → CI Pipeline roda → todos os checks passam → revisão → merge aprovado.
