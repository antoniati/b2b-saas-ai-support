#!/bin/bash

# ==========================================
# Dev Manager - Gerenciador de Devs Fakes
# ==========================================
# Permite simular múltiplos devs em um projeto Git.
# Recursos:
# - Adição, remoção, listagem e switch de devs.
# - Auto-switch por branch (feature/devA-*).
# - Suporte a emojis e commits simulados.
# ==========================================

# Diretório do script e arquivo JSON de devs
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JSON_FILE="$SCRIPT_DIR/.dev-users.json"

# Cores para terminal
GREEN="\e[32m"; CYAN="\e[36m"; YELLOW="\e[33m"; RED="\e[31m"; RESET="\e[0m"

# Inicializa arquivo JSON se não existir
if [ ! -f "$JSON_FILE" ]; then
  echo "[]" > "$JSON_FILE"
fi

# ----------------------------
# Função para obter branch atual
# ----------------------------
get_current_branch() {
  git rev-parse --abbrev-ref HEAD
}

# ----------------------------
# Auto switch baseado em branch
# ----------------------------
auto_switch() {
  branch=$(get_current_branch)
  if [[ "$branch" =~ feature/(dev[A-Z]+)- ]]; then
    dev="${BASH_REMATCH[1]}"
    index=$(jq -r --arg d "$dev" 'map(.name==$d) | index(true)' "$JSON_FILE")
    if [ "$index" != "null" ]; then
      name=$(jq -r ".[$index].name" "$JSON_FILE")
      email=$(jq -r ".[$index].email" "$JSON_FILE")
      git config user.name "$name"
      git config user.email "$email"
      echo -e "${GREEN}🔁 Auto: Agora você está como $name <$email>${RESET}"
    else
      echo -e "${YELLOW}⚠ Nenhum dev cadastrado com nome '$dev'${RESET}"
    fi
  fi
}

# ----------------------------
# Listar devs cadastrados
# ----------------------------
list_devs() {
  echo -e "${CYAN}👥 Devs cadastrados:${RESET}"
  if [ $(jq length "$JSON_FILE") -eq 0 ]; then
    echo "  Nenhum dev cadastrado."
  else
    jq -r '.[] | "- \(.name) <\(.email)>"' "$JSON_FILE" | nl
  fi
}

# ----------------------------
# Adicionar dev
# ----------------------------
add_dev() {
  read -p "Nome do dev (ex: devA 🚀): " name
  read -p "Email do dev (ex: deva@email.com): " email
  tmp=$(mktemp)
  jq --arg n "$name" --arg e "$email" \
    '. += [{"name":$n,"email":$e}]' "$JSON_FILE" > "$tmp" && mv "$tmp" "$JSON_FILE"
  echo -e "${GREEN}✅ $name adicionado!${RESET}"
}

# ----------------------------
# Remover dev
# ----------------------------
remove_dev() {
  list_devs
  read -p "Número do dev para remover: " num
  tmp=$(mktemp)
  jq "del(.[$((num-1))])" "$JSON_FILE" > "$tmp" && mv "$tmp" "$JSON_FILE"
  echo -e "${RED}❌ Dev removido.${RESET}"
}

# ----------------------------
# Switch manual de dev
# ----------------------------
switch_dev() {
  list_devs
  read -p "Número do dev para usar: " num
  name=$(jq -r ".[$((num-1))].name" "$JSON_FILE")
  email=$(jq -r ".[$((num-1))].email" "$JSON_FILE")
  if [ "$name" == "null" ]; then
    echo -e "${RED}Opção inválida${RESET}"; exit 1
  fi
  git config user.name "$name"
  git config user.email "$email"
  echo -e "${GREEN}✅ Agora você está como $name <$email>${RESET}"
  echo -e "\n${YELLOW}📜 Últimos commits deste dev:${RESET}"
  git log --author="$name" --pretty=format:"%C(cyan)%h%Creset - %C(green)%s%Creset (%C(yellow)%cr%Creset)" -n 5
}

# ----------------------------
# Menu principal
# ----------------------------
case "$1" in
  list) list_devs ;;
  add) add_dev ;;
  remove) remove_dev ;;
  switch) switch_dev ;;
  auto) auto_switch ;;
  *)
    echo -e "${YELLOW}Uso:${RESET} ./dev-manager.sh {list|add|remove|switch|auto}"
    ;;
esac
