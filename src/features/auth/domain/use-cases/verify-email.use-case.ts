import { IAuthRepository } from '../repositories/auth.repository';
import { VerifyEmailCredentials } from '../entities/user.entity';

export const verifyEmailUseCase =
  (authRepository: IAuthRepository) =>
  async (credentials: VerifyEmailCredentials): Promise<string> => {
    return authRepository.verifyEmail(credentials);
  };
