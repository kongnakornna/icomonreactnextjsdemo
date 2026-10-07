import { IAuthRepository } from '../repositories/auth.repository';

export const updateUserPasswordUseCase =
  (authRepository: IAuthRepository) =>
  async (id: string, oldPassword: string, newPassword: string, confirmPassword: string): Promise<void> => {
    return authRepository.updateUserPassword(id, oldPassword, newPassword, confirmPassword);
  };
