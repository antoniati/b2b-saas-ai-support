## 🗂 Estrutura do Projeto

```
📦 b2b-saas-ai-support/
│ └─ 🧪 __tests__/
│   ├─ 🧩 fixtures/
│   ├─ 🧪 integration/
│   ├─ 🎭 mocks/
│   ├─  ⚙ setup/
│   ├─ 🧪 unit/
│   └─ 🧪 healt.spec.ts – testes

├─ 🛠 .github/ – CI/CD, templates e configs
│ ├─ 🔄 workflows/
│ ├─ 🤖 dependabot.yml
│ └─ 📝 pull_request_template.md

├─ ⚡ app/ – rotas e páginas Next.js
│ ├─ 🔑 api/
│ │ ├─ 🔐 auth/[...nextauth].ts – API de autenticação
│ │ ├─ ❤️ healt/route.ts – API de saúde
│ │ └─ 👤 users/
│ │ └─ ✅ complete-registration/route.ts – registro de usuário
│ ├─ 🖼 favicon.ico
│ ├─ 🔑 auth/
│ ├─ 👥 users/
│ ├─ 🎨 globals.css
│ ├─ 📄 page.tsx
│ └─ 📐 layout.tsx

├─ 🧩 features/ – módulos independentes
│ ├─ 🔑 auth/
│ ├─ 📧 emails/
│ ├─ 🖼 layout/
│ ├─ 💳 plans/
│ ├─ 🏢 tenants/
│ ├─ 🔑 tokens/
│ └─ 👥 users/

├─ 🛋 shared/ – recursos compartilhados
│ ├─ 🎨 ui/
│ ├─ 🧱 components/
│ ├─ 📚 lib/
│ ├─ 🪝 hooks/
│ ├─ ⚙ server-actions/
│ ├─ 🌐 contexts/
│ ├─ 🏗 providers/
│ ├─ 🔌 services/
│ ├─ 📏 constants/
│ ├─ 🗂 types/
│ ├─ 🛠 utils/

├─ 🗄 prisma/ – ORM & banco de dados
│ ├─ 📜 schema.prisma
│ └─ 📂 migrations/

├─ 🌍 public/ – assets públicos
│ ├─ 🖼 images/
│ └─ 🎨 icons/

├─ 📑 configs & root files
│ ├─ 🐳 .dockerignore
│ ├─ 🙈 .gitignore
│ ├─ 🎨 .prettierrc
│ ├─ ⚙ components.json
│ ├─ 🐳 docker-compose.yml
│ ├─ 🐳 DockerFile
│ ├─ 📏 .eslint.config.mjs
│ ├─ 🧪 jest.config.ts
│ ├─ 🧪 jest.setup.ts
│ ├─ 📜 LICENSE (Apache License 2.0)
│ ├─ 🛡 middleware.ts
│ ├─ 🌐 next-env.d.ts
│ ├─ ⚡ next.config.ts
│ ├─ 📦 package.json
│ ├─ 🔧 plopfile.js
│ ├─ 🔒 pnpm-lock.yaml
│ ├─ 🎨 postcss.config.mjs
│ ├─ 📘 README.md
│ ├─ 🎨 tailwind.config.js
│ └─ 🟦 tsconfig.json
```

> Nota: A estrutura de pastas das `features` segue o mesmo padrão de `shared`.
