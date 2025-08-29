# Tipos no Projeto

Este guia descreve os tipos centrais que todos os devs devem usar ao lidar com APIs, formulários e respostas do backend. O objetivo é garantir consistência e previsibilidade em todo o projeto.

## 1. `ActionResponse<T>`

O tipo principal para respostas de APIs e mutations do frontend.

### Assinatura:
```ts
export type ActionResponse<TData = unknown> =
  | {
      ok: true;
      status: number;
      message?: string;
      data?: TData;
    }
  | {
      ok: false;
      status: number;
      message: string;
      errors?: Record<string, string>;
      code?: string;
      id?: string;
    };
```

### Boas práticas:

- Sempre utilize `ActionResponse<T>` como retorno das funções de API e mutations.
- Use o campo `message` para exibir mensagens amigáveis ao usuário.
- Utilize `errors` para detalhar erros de validação de campos.
- `status` deve refletir o status HTTP da operação (200, 400, 500, etc.).

## 2. Tipos auxiliares

Se necessário, crie tipos específicos para formulários ou objetos de domínio, mas sempre compondo ou usando `ActionResponse<T>`:
```ts
export interface UserData {
  id: string;
  name: string;
  email: string;
}

export type UserResponse = ActionResponse<UserData>;
```

## 3. Erros de domínio

Para erros específicos de lógica de negócio, utilize a classe DomainError:
```ts
export class DomainError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(message: string, status = 400, errors?: Record<string, string>) {
    super(message);
    this.name = 'DomainError';
    this.status = status;
    this.errors = errors;
  }
}
```

### Uso recomendado:
```ts
if (!userFound) {
  throw new DomainError('Usuário não encontrado', 404);
}
```

## 4. Integração com API Client

Todas as funções do apiClient devem retornar `ActionResponse<T>` para garantir que a tipagem seja consistente em todo o frontend:

```ts
const res: ActionResponse<UserData> = await apiClient.get('/users/123');
if (res.ok) {
  console.log(res.data);
} else {
  console.error(res.message);
}
```