import type { ITokensRepository } from '@/src/application/repositories/tokens.repository.interface';
import type { Token } from '@/src/entities/models/token';

export class InFileTokensRepository implements ITokensRepository {
  private tokens: Token[] = [];

  async list(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: Token[]; total: number }> {
    let filtered = [...this.tokens];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(t => t.name.toLowerCase().includes(search));
    }

    if (params?.isActive !== undefined) {
      filtered = filtered.filter(t => t.isActive === params.isActive);
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: filtered.slice(start, end),
      total: filtered.length,
    };
  }

  async getById(id: string): Promise<Token | undefined> {
    return this.tokens.find(t => t.id === id);
  }

  async create(token: Partial<Token>): Promise<Token> {
    const newToken: Token = {
      id: Math.random().toString(36).substring(2, 15),
      name: token.name || '',
      token: Math.random().toString(36).substring(2, 35),
      permissions: token.permissions || [],
      expiresAt: token.expiresAt,
      isActive: token.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tokens.push(newToken);
    return newToken;
  }

  async update(id: string, token: Partial<Token>): Promise<Token> {
    const index = this.tokens.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Token not found');

    this.tokens[index] = {
      ...this.tokens[index],
      ...token,
      updatedAt: new Date(),
    };
    return this.tokens[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.tokens.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Token not found');
    this.tokens.splice(index, 1);
  }

  async getByValue(tokenValue: string): Promise<Token | undefined> {
    return this.tokens.find(t => t.token === tokenValue);
  }
}
