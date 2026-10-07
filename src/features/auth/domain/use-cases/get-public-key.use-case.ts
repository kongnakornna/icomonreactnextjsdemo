import { IAuthRepository } from '../repositories/auth.repository';
import { PublicKeyResponse } from '../entities/user.entity';

export const getPublicKeyUseCase =
  (authRepository: IAuthRepository) =>
  async (): Promise<PublicKeyResponse> => {
    return authRepository.getPublicKey();
  };
