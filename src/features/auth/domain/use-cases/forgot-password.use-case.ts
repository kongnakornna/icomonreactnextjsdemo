import { IAuthRepository } from '../repositories/auth.repository';

export const forgotPasswordUseCase =
  (authRepository: IAuthRepository) =>
  async (email: string): Promise<void> => {
    return authRepository.forgotPassword(email);
  };
