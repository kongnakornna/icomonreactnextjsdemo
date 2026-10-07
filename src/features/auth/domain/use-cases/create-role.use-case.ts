import { IAuthRepository } from '../repositories/auth.repository';
import { Role, CreateRoleRequest } from '../entities/role.entity';

export const createRoleUseCase =
  (authRepository: IAuthRepository) =>
  async (request: CreateRoleRequest): Promise<Role> => {
    return authRepository.createRole(request);
  };
