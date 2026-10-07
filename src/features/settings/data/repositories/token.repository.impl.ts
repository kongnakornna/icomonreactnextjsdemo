import { ITokenRepository } from '../../domain/repositories/token.repository';
import { Token } from '../../domain/entities/settings.entity';
import { SettingsApiDataSource } from '../datasources/settings.api.datasource';
import { TokenResponseDto } from '../dtos/settings.dto';

export class TokenRepositoryImpl implements ITokenRepository {
  constructor(private ds: SettingsApiDataSource) {}

  async list(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: Token[]; total: number }> {
    const result = await this.ds.listTokens(params);
    return {
      data: result.data.map(d => this.toEntity(d)),
      total: result.total,
    };
  }

  async getById(id: string): Promise<Token | undefined> {
    try {
      const dto = await this.ds.getTokenById(id);
      return this.toEntity(dto);
    } catch {
      return undefined;
    }
  }

  async create(token: Partial<Token>): Promise<Token> {
    const dto = await this.ds.createToken(token as Partial<TokenResponseDto>);
    return this.toEntity(dto);
  }

  async update(id: string, token: Partial<Token>): Promise<Token> {
    const dto = await this.ds.updateToken(id, token as Partial<TokenResponseDto>);
    return this.toEntity(dto);
  }

  async delete(id: string): Promise<void> {
    await this.ds.deleteToken(id);
  }

  async getByValue(tokenValue: string): Promise<Token | undefined> {
    const result = await this.ds.listTokens();
    const found = result.data.find(t => t.token === tokenValue);
    return found ? this.toEntity(found) : undefined;
  }

  private toEntity(d: TokenResponseDto): Token {
    return {
      id: d.id,
      name: d.name,
      token: d.token,
      permissions: d.permissions || [],
      expiresAt: d.expiresAt ? new Date(d.expiresAt) : undefined,
      lastUsed: d.lastUsed ? new Date(d.lastUsed) : undefined,
      isActive: d.isActive,
      createdAt: new Date(d.createdAt),
      updatedAt: new Date(d.updatedAt),
    };
  }
}
