import { IAuthRepository } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';

export const updateUserUseCase =
  (authRepository: IAuthRepository) =>
  async (id: string, data: Partial<User>): Promise<User> => {
    return authRepository.updateUser(id, data);
  };
