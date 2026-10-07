import { IAuthRepository, RegisterCredentials } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';

export const createUserUseCase =
  (authRepository: IAuthRepository) =>
  async (credentials: RegisterCredentials): Promise<User> => {
    return authRepository.createUser(credentials);
  };
