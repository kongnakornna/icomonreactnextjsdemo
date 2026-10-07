import { IAuthRepository } from '../repositories/auth.repository';

export const deleteUserUseCase =
  (authRepository: IAuthRepository) =>
  async (id: string): Promise<void> => {
    return authRepository.deleteUser(id);
  };
