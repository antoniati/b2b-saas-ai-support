/**
 * Exporta os métodos de autenticação do NextAuth para serem utilizados em outros módulos da aplicação.
 *
 * @remarks
 * Esta exportação permite que os handlers `GET` e `POST` do NextAuth sejam acessados a partir deste arquivo,
 * facilitando a configuração da autenticação no projeto.
 *
 * @module
 */
export { GET, POST } from "@/features/auth/auth";
