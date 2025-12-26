export interface DataResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface PaginatedDataResponse<T> extends DataResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    [key: string]: unknown;
  };
}
