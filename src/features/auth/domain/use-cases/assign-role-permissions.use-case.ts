import { IAuthRepository } from '../repositories/auth.repository';
import { Role, AssignRolePermissionsRequest } from '../entities/role.entity';

export const assignRolePermissionsUseCase =
  (authRepository: IAuthRepository) =>
  async (id: number, request: AssignRolePermissionsRequest): Promise<Role> => {
    return authRepository.assignRolePermissions(id, request);
  };
