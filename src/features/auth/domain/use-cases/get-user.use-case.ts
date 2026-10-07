import { IAuthRepository } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';

export const getUserUseCase =
  (authRepository: IAuthRepository) =>
  async (id: string): Promise<User> => {
    return authRepository.getUserById(id);
  };
