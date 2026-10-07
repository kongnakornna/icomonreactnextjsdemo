import { IAuthRepository, UserListParams } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';

export const listUsersUseCase =
  (authRepository: IAuthRepository) =>
  async (params?: UserListParams): Promise<{ data: User[]; total: number }> => {
    return authRepository.listUsers(params);
  };
