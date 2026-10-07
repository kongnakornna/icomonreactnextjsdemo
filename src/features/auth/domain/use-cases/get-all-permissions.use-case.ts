import { IAuthRepository } from '../repositories/auth.repository';
import { Permission } from '../entities/permission.entity';

export const getAllPermissionsUseCase =
  (authRepository: IAuthRepository) =>
  async (): Promise<Permission[]> => {
    return authRepository.getAllPermissions();
  };
