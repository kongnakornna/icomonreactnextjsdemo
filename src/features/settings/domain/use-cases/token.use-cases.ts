import { ITokenRepository } from '../repositories/token.repository';
import { Token } from '../entities/settings.entity';

export class ListTokensUseCase {
  constructor(private repo: ITokenRepository) {}

  async execute(params?: { search?: string; page?: number; pageSize?: number; isActive?: boolean }): Promise<{ data: Token[]; total: number }> {
    return this.repo.list(params);
  }
}

export class CreateTokenUseCase {
  constructor(private repo: ITokenRepository) {}

  async execute(token: Partial<Token>): Promise<Token> {
    return this.repo.create(token);
  }
}

export class GetTokenUseCase {
  constructor(private repo: ITokenRepository) {}

  async execute(id: string): Promise<Token | undefined> {
    return this.repo.getById(id);
  }
}

export class UpdateTokenUseCase {
  constructor(private repo: ITokenRepository) {}

  async execute(id: string, token: Partial<Token>): Promise<Token> {
    return this.repo.update(id, token);
  }
}

export class DeleteTokenUseCase {
  constructor(private repo: ITokenRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
