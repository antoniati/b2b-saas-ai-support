/**
 * Tipo principal para respostas de APIs e mutations do frontend.
 */
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
