import { IAuthRepository } from '../repositories/auth.repository';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

export const logoutUseCase =
  (authRepository: IAuthRepository) =>
  async (): Promise<void> => {
    await authRepository.logout();
    localStorage.removeItem(APP_CONSTANTS.TOKEN_KEY);
    localStorage.removeItem(APP_CONSTANTS.REFRESH_TOKEN_KEY);
    localStorage.removeItem(APP_CONSTANTS.USER_KEY);
  };
