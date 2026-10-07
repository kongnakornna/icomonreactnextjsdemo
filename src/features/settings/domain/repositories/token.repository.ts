import { Token } from '../entities/settings.entity';

export interface ITokenRepository {
  list(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: Token[]; total: number }>;
  getById(id: string): Promise<Token | undefined>;
  create(token: Partial<Token>): Promise<Token>;
  update(id: string, token: Partial<Token>): Promise<Token>;
  delete(id: string): Promise<void>;
  getByValue(tokenValue: string): Promise<Token | undefined>;
}
