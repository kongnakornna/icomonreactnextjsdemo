export interface Repository<TEntity, TId = string> {
  findById(id: TId): Promise<TEntity | null>;
  findAll(params?: FindAllParams): Promise<{ data: TEntity[]; total: number }>;
  create(entity: Partial<TEntity>): Promise<TEntity>;
  update(id: TId, entity: Partial<TEntity>): Promise<TEntity>;
  delete(id: TId): Promise<void>;
}

export interface FindAllParams {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
