// importando o modulo path do node para trabalhar com caminhos de arquivos
const path = require("path");

/**
 * Função que gera os templates de features para o Plop.js
 *
 * @param {plop.PlopGenerator} plop - Instância do Plop.js
 * @returns {void} - Não retorna nada
 */
module.exports = function (plop) {
  // Helper para formatar o nome em pascalCase
  plop.setHelper("pascalCase", (text) => {
    if (!text) return "";
    return text
      .split("-") // separando as palavras pelo hifen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // maiuscula a primeira letra de cada palavra
      .join(""); // juntando as palavras
  });

  // Helper para formatar o nome em camelCase
  plop.setHelper("camelCase", (text) => {
    if (!text) return "";
    const pascal = text
      .split("-") // separando as palavras pelo hifen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // maiuscula a primeira letra de cada palavra
      .join(""); // juntando as palavras
    return pascal.charAt(0).toLowerCase() + pascal.slice(1); // minúscula a primeira letra
  });

  // Gera a feature completa
  plop.setGenerator("features", {
    description: "Criar uma nova features completa",
    // Prompts para o usuário preencher
    prompts: [
      {
        type: "input", // tipo de prompt
        name: "name", // nome do prompt
        message: "Nome da features (kebab-case):", // mensagem para o usuário

        /**
         * Valida o nome recebido
         * @param {string} value - Valor recebido do usuário
         * @returns {boolean|string} - Retorna verdadeiro se o valor for válido, caso contrário, retorna uma mensagem de erro
         */
        validate: (value) => {
          if (!value) return "Nome é obrigatório";
          if (!/^[a-z-]+$/.test(value))
            return "Use apenas letras minúsculas e hífens";
          return true;
        },
      },
    ],
    // Ações a serem executadas ao criar a feature
    actions: [
      {
        type: "addMany", // tipo de ação
        destination: "features/{{name}}", // pasta de destino
        base: path.join(__dirname, "plop-templates"), // pasta base
        templateFiles: path.join(__dirname, "plop-templates/**/*.hbs"), // templates a serem usados
        globOptions: { dot: true }, // permite usar o . no path
        rename: (filepath) => filepath.replace(/\.hbs$/, ""), // remove o .hbs da saída
        abortOnFail: true, // aborta se a ação falhar
      },
      {
        type: "append", // tipo de ação
        path: "features/{{name}}/index.ts", // caminho do arquivo
        template: "// Features {{pascalCase name}} criada automaticamente\n", // template a ser usado
      },
    ],
  });
};
