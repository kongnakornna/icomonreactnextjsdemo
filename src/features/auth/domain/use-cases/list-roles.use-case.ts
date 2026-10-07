import { IAuthRepository } from '../repositories/auth.repository';
import { Role } from '../entities/role.entity';

export const listRolesUseCase =
  (authRepository: IAuthRepository) =>
  async (): Promise<Role[]> => {
    return authRepository.getRoles();
  };
