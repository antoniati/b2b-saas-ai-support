// Importa a biblioteca bcrypt para criptografia
import bcrypt from "bcryptjs";

// Importa a classe DomainError e as constantes de mensagens de erro
import { DomainError, ERROR_MESSAGES } from "@/shared";

/**
 * Classe de serviços de senha.
 */
export class PasswordService {
  /**
   * Define o fator de custo do bcrypt
   * (pode ser ajustado conforme performance)
   */
  private static readonly SALT_ROUNDS = 12;

  /**
   * Cria um hash de senha utilizando o bcrypt.
   */
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compara uma senha com um hash de senha utilizando o bcrypt.
   */
  static async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Verifica se a senha tem força suficiente.
   */
  static validateStrength(password: string): void {
    const errors: string[] = [];

    if (password.length < 6)
      errors.push("A senha deve ter no mínimo 6 caracteres");

    if (!/[0-9]/.test(password))
      errors.push("A senha deve conter pelo menos um número");

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("A senha deve conter pelo menos um caractere especial");

    if (errors.length > 0)
      throw new DomainError(ERROR_MESSAGES.WEAK_PASSWORD, 422, {
        password: errors.join(", "),
      });
  }

  /**
   * Gera uma senha aleatória forte com o tamanho especificado.
   */
  static generateStrongPassword(length: number = 12): string {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.<>?";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }

  /**
   * Verifica se o hash de senha precisa ser re-hashado devido a uma alteração no custo.
   */
  static async needsRehash(hashedPassword: string): Promise<boolean> {
    // Extrai o custo armazenado no hash ($2a$12$ -> custo 12)
    const cost = parseInt(hashedPassword.split("$")[2], 10);
    return cost !== this.SALT_ROUNDS;
  }
}
