import { IAuthRepository } from '../repositories/auth.repository';

export const logoutAllUseCase =
  (authRepository: IAuthRepository) =>
  async (): Promise<void> => {
    return authRepository.logoutAll();
  };
