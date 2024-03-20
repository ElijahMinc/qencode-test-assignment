export interface ErrorResponse {
  message: string;
  details: Record<string, unknown>[] | string;
  config: string;
  status: string;
  error: true;
}
