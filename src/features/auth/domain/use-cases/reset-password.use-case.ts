import { IAuthRepository, ResetPasswordCredentials } from '../repositories/auth.repository';

export const resetPasswordUseCase =
  (authRepository: IAuthRepository) =>
  async (credentials: ResetPasswordCredentials): Promise<void> => {
    return authRepository.resetPassword(credentials);
  };
