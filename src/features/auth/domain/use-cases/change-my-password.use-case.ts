import { IAuthRepository, ChangeMyPasswordCredentials } from '../repositories/auth.repository';

export const changeMyPasswordUseCase =
  (authRepository: IAuthRepository) =>
  async (credentials: ChangeMyPasswordCredentials): Promise<void> => {
    return authRepository.changeMyPassword(credentials);
  };
