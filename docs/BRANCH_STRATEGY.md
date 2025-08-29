# Branch Strategy

## Branches principais

- `main` → produção
- `develop` → integração de features concluídas

## Branches de trabalho

- `feature/<nome>` → novas features
- `fix/<nome>` → correções rápidas
- `hotfix/<nome>` → correções críticas em produção

## Boas práticas

- Sempre criar branch a partir de `develop`
- Merge via PR
- Rebase ou squash ao integrar, evitar merges diretos
