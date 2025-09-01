export interface ApiResponse<TData> {
  ok: boolean;
  status: number;
  message?: string;
  data?: TData;
}
