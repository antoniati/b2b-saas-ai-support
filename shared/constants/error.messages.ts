export const ERROR_MESSAGES = {
  // Geral
  GENERIC_ERROR: 'Ocorreu um erro inesperado.',
  DATA_NOT_FOUND: 'Não foi possível obter os dados solicitados.',
  UPDATE_FAILED: 'Falha ao atulizar os dados.',
  NO_CHANGES_DETECTED: 'Nenhuma alteração detectada nos dados fornecidos.',
  INVALID_FIELDS: 'Existem campos inválidos. Verifique os dados e tente novamente.',
  INTERNAL_SERVER_ERROR: 'Erro interno do servidor. Contate o suporte se o problema persistir.',
  OPERATION_NOT_PERMITTED: 'Você não tem permissão para executar esta ação.',

  // Usuário
  USER_CREATION_FAILED: 'Falha ao criar usuário.',
  USER_REGISTER_ERROR: 'Falha ao completar o registro do usuário.',
  USER_NOT_FOUND: 'Usuário não encontrado.',
  USER_UPDATE_FAILED: 'Falha ao atualizar os dados do usuário.',

  // Campos e validações (email/senha)
  INVALID_CREDENTIALS: 'Credenciais inválidas. Por favor, verifique email e senha.',
  NON_EXISTENT_EMAIL: 'Email não encontrado.',
  EMAIL_INVALID: 'O endereço de email fornecido é inválido.',
  EMAIL_ALREADY_REGISTERED: 'Este email já está cadastrado.',
  EMAIL_VERIFICATION_UPDATE_FAILED: 'Falha ao atualizar a data de verificação do email.',
  EMAIL_NOT_VERIFIED: 'Sua conta ainda não foi verificada. Por favor, confirme seu email antes de efetuar login.',
  CONFIRM_PASSWORD: 'As senhas informadas não coincidem.',
  PASSWORD_UPDATE_FAILED: 'Falha ao atualizar a senha.',
  PASSWORD_HASH_FAILED: 'Falha ao gerar hash da senha.',
  WEAK_PASSWORD: 'Senha fraca. Combine letras, números e símbolos (ex.: Abc123!)',

  // Token
  INVALID_TOKEN: 'Token inválido.',
  NON_EXISTENT_TOKEN: 'Token não encontrado.',
  TOKEN_GENERATION_FAILED: 'Falha ao gerar token de verificação.',
  TOKEN_DELETION_FAILED: 'Falha ao deletar o token.',
  EXPIRED_TOKEN: 'Token expirado.',
  INVALID_2FA_CODE: 'Código de verificação de dois fatores inválido.',
  NOT_FOUND_2FA: 'Não foi possível encontrar o código de verificação de dois fatores fornecido.',
  NOT_MATCH_2FA_CODE: 'Código de verificação de dois fatores incorreto.',

  // Planos
  NO_PLANS_FOUND: 'Nenhum plano encontrado.',
};
