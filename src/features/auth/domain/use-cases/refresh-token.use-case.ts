import { IAuthRepository } from '../repositories/auth.repository';
import { AuthResponse } from '../entities/user.entity';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

export const refreshTokenUseCase =
  (authRepository: IAuthRepository) =>
  async (): Promise<AuthResponse> => {
    const response = await authRepository.refreshToken();
    localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, response.accessToken);
    localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, response.refreshToken);
    return response;
  };
