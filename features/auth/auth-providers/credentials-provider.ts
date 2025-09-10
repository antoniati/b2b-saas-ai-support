import bcrypt from "bcryptjs"; // Utilizado para criptografar e comparar senhas
import Credentials from "next-auth/providers/credentials"; // Utilizado para fornecer dados de login
import { LoginSchema } from "@/features/users/schemas"; // Schema para validar os dados de login
import { UserRepository } from "@/features/users/repository/users-repo";

/**
 * Provedor de autenticação por credenciais personalizadas usando NextAuth.
 *
 * Este provedor permite que os usuários façam login usando um nome de usuário e senha.
 * A senha fornecida é comparada com a senha armazenada no banco de dados utilizando o bcrypt.
 *
 * A autorização acontece em duas etapas:
 * 1. Validação dos dados de login com o esquema `LoginSchema`.
 * 2. Comparação da senha fornecida com a senha armazenada usando bcrypt.
 *
 * @constant {object} credentialsProvider
 * @see https://next-auth.js.org/providers/credentials
 */
export const credentialsProvider = Credentials({
  // A função authorize é chamada para validar e autorizar os dados de login.
  async authorize(credentials) {
    // Valida os dados de login usando o esquema `LoginSchema`.
    const validatedFields = LoginSchema.safeParse(credentials);

    // Se os dados de login forem válidos, busca o usuário pelo email e compara a senha.
    if (validatedFields.success) {
      const { email, password } = validatedFields.data; // Extrai os dados de login.
      const user = await UserRepository.findByEmailForCredentials(email);
      if (!user || !user.password) return null; // Se o usuário não existe ou a senha não está associada, retorna null.
      const passwordsMatch = await bcrypt.compare(password, user.password); // Compara a senha fornecida com a senha armazenada usando bcrypt.
      if (passwordsMatch) return user; // Se as senhas forem iguais, retorna o usuário.
    }

    return null; // Se os dados de login não forem válidos, retorna null.
  },
});
