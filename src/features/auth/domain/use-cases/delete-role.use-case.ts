import { IAuthRepository } from '../repositories/auth.repository';

export const deleteRoleUseCase =
  (authRepository: IAuthRepository) =>
  async (id: number): Promise<void> => {
    return authRepository.deleteRole(id);
  };
