import { IAuthRepository } from '../repositories/auth.repository';
import { Role } from '../entities/role.entity';

export const getRoleUseCase =
  (authRepository: IAuthRepository) =>
  async (id: number): Promise<Role> => {
    return authRepository.getRole(id);
  };
