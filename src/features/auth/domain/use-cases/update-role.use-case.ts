import { IAuthRepository } from '../repositories/auth.repository';
import { Role, UpdateRoleRequest } from '../entities/role.entity';

export const updateRoleUseCase =
  (authRepository: IAuthRepository) =>
  async (id: number, request: UpdateRoleRequest): Promise<Role> => {
    return authRepository.updateRole(id, request);
  };
