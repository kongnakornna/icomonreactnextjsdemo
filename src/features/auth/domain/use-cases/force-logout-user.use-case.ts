import { IAuthRepository } from '../repositories/auth.repository';

export const forceLogoutUserUseCase =
  (authRepository: IAuthRepository) =>
  async (id: string): Promise<void> => {
    return authRepository.forceLogoutUser(id);
  };
