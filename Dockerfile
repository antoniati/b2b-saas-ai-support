# Dockerfile de exemplo para Node.js
FROM node:20-alpine

# Diretório da aplicação no container
WORKDIR /usr/src/app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia apenas package.json e lockfile para instalar dependências
COPY package.json pnpm-lock.yaml ./

# Instala dependências
RUN pnpm install

# Copia o restante da aplicação
COPY . .

# Expo  
EXPOSE 3000

# Comando padrão para rodar a aplicação (pode mudar para "pnpm dev")
CMD ["sh", "-c", "while true; do sleep 1000; done"]