import { IAuthRepository } from '../repositories/auth.repository';

export const updateUserRoleUseCase =
  (authRepository: IAuthRepository) =>
  async (id: string, roleId: number): Promise<void> => {
    return authRepository.updateUserRole(id, roleId);
  };
