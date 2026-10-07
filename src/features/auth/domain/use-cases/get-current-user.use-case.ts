import { IAuthRepository } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';

export const getCurrentUserUseCase =
  (authRepository: IAuthRepository) =>
  async (): Promise<User | null> => {
    return authRepository.getCurrentUser();
  };
