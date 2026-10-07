import { IAuthRepository } from '../repositories/auth.repository';
import { LoginCredentials, AuthResponse } from '../entities/user.entity';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

export type LoginInputData = LoginCredentials;

export const loginUseCase =
  (authRepository: IAuthRepository) =>
  async (credentials: LoginInputData): Promise<AuthResponse> => {
    const response = await authRepository.login(credentials);
    localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, response.accessToken);
    localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(APP_CONSTANTS.EXPIRES_IN_KEY, response.expiresIn.toString());
    localStorage.setItem(APP_CONSTANTS.USER_KEY, JSON.stringify(response.user));
    localStorage.setItem('username', credentials.username);
    return response;
  };
