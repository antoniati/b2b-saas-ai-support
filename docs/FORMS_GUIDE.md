# Formulários no Projeto

Este guia descreve os padrões e hooks que utilizamos para lidar com formulários no frontend, mensagens de sucesso/erro e integração com queries do backend.

## Hooks Principais

### 1. useFormSubmitQuery

Responsável por submeter formulários usando uma mutation do react-query.

### Assinatura:

```ts
useFormSubmitQuery<TFormValues extends FieldValues, TData = unknown>({
  form,
  mutationFn,
  onSuccessCallback?,
  onErrorCallback?,
  invalidateQueries?,
})
```

### Parâmetros:

`form`: instância do React Hook Form (UseFormReturn<TFormValues>).
`mutationFn`: função assíncrona que realiza a operação (TFormValues -> Promise<ActionResponse<TData>>).
`onSuccessCallback`: callback opcional chamado quando a mutation é bem-sucedida.
`onErrorCallback`: callback opcional chamado em caso de erro.
`invalidateQueries`: array de keys de queries para invalidar após sucesso.

### Retorno:

```ts
{
  (handleSubmitFn, // função para passar para o submit do form
    isLoading, // true enquanto a mutation está em andamento
    response, // dados retornados da mutation
    error, // erro da mutation
    reset); // função para resetar o formulário
}
```

### 2. useFormMessages

Hook que trata mensagens de sucesso e erro de formulários de forma centralizada.

### Assinatura:

```ts
useFormMessages<TFormValues extends FieldValues, TData = unknown>({
  form,
  mutationFn,
  invalidateQueries?,
})
```

### Retorno:

```ts
{
  (handleSubmitFn, // função de submit
    isLoading,
    response,
    error, // mensagem de erro
    success, // mensagem de sucesso
    cleanMessages, // limpa mensagens e erros do form
    setError,
    setSuccess);
}
```

> Observação:
> Internamente, o hook utiliza useFormSubmitQuery para a lógica de submissão.

## Boas práticas

Sempre use `ActionResponse<T>` como retorno de APIs/mutations:

```ts
export type ActionResponse<TData = unknown> =
  | { ok: true; status: number; message?: string; data?: TData }
  | { ok: false; status: number; message: string; errors?: Record<string, string> };
```

Limpe mensagens do form ao abrir ou trocar de formulário:

```ts
cleanMessages();
```

Invalide queries quando o form alterar dados compartilhados:

```ts
invalidateQueries: ['users', 'products'];
```

Evite lógica de negócio nos `hooks`; foque apenas em state do form, mensagens e integração com mutation.

Exemplo de uso

```ts
const form = useForm<FormValues>();
const { handleSubmitFn, error, success } = useFormMessages({
  form,
  mutationFn: (values) => apiClient.post('/users', values),
  invalidateQueries: ['usersList'],
});

return (
  <form onSubmit={form.handleSubmit(handleSubmitFn)}>
    <input {...form.register('name')} />
    <button type="submit">Enviar</button>
    {error && <p className="text-red-500">{error}</p>}
    {success && <p className="text-green-500">{success}</p>}
  </form>
);
```
