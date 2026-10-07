import { IAuthRepository, RegisterCredentials } from '../repositories/auth.repository';

export type SignUpInputData = RegisterCredentials;

export const signUpUseCase =
  (authRepository: IAuthRepository) =>
  async (credentials: SignUpInputData): Promise<void> => {
    if (!authRepository.register) {
      throw new Error('Register is not supported');
    }
    return authRepository.register(credentials);
  };
