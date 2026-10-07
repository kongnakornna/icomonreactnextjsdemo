import { IAuthRepository } from '../repositories/auth.repository';
import { SignInCredentials, AuthResponse } from '../entities/user.entity';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

export type SignInInputData = SignInCredentials;

export const signInUseCase =
  (authRepository: IAuthRepository) =>
  async (credentials: SignInInputData): Promise<AuthResponse> => {
    const response = await authRepository.signIn(credentials);
    localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, response.accessToken);
    localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(APP_CONSTANTS.USER_KEY, JSON.stringify(response.user));
    return response;
  };
