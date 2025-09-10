//  Exporta utenticação utilizando NextAuth.
export * from "./auth";

/**
 * ⚠️ ATENCÃO: Não importar authConfig a partir deste arquivo,
 *  para garantir que ele seja carregado corretamente importe-o do caminho completo.
 *
 */
export * from "./config/routes-config";

// Exporta os serviços de autenticação
export * from "./services/auth-services";

// Exporta as ações de autenticação
export * from "./server-actions/auth-actions";

// Exporta os callbacks de autenticação
export * from "./callbacks/jwt-callback";
export * from "./callbacks/session-callback";
export * from "./callbacks/sigin-callback";

// Exporta os utilitários de rotas de autenticação
export * from "./utils/auth-routes";
export * from "./utils/ignore-routes";
export * from "./utils/private-routes";

// Exporta os eventos de autenticação
export * from "./events/link-account";

// Exporta os tipos usados na autenticação
export * from "./types/events-types";
export * from "./types/callbacks-types";
export * from "./types/login-types";
