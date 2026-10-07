import { IAuthRepository } from '../repositories/auth.repository';

export const checkPermissionUseCase =
  (authRepository: IAuthRepository) =>
  async (permission: string): Promise<boolean> => {
    return authRepository.hasPermission(permission);
  };
