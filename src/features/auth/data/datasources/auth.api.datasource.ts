import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { environment } from '../../../../core/config/environment';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { SignInRequestDto } from '../dtos/signin-request.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { ChangePasswordRequestDto } from '../dtos/change-password-request.dto';
import { ResetPasswordRequestDto } from '../dtos/reset-password-request.dto';
import { PublicKeyResponseDto } from '../dtos/public-key-response.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { RoleResponseDto, RoleListResponseDto, CreateRoleRequestDto, UpdateRoleRequestDto, AssignRolePermissionsRequestDto } from '../dtos/role.dto';
import { PermissionListResponseDto } from '../dtos/permission.dto';
import { UserListParams } from '../../domain/repositories/auth.repository';

function getBaseUrl(): string {
  return environment.useProxy ? '/api' : `${environment.apiTargetUrl}/api`;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const serverMsg = (body as any)?.error?.msg || (body as any)?.msg || (body as any)?.message;
    const status = response.status;
    let errorMessage = serverMsg || `Server Error (${status})`;

    if (status === 401) errorMessage = 'ไม่ได้รับอนุญาต กรุณาเข้าสู่ระบบอีกครั้ง';
    else if (status === 403) errorMessage = 'คุณไม่มีสิทธิ์เข้าถึง';
    else if (status === 404) errorMessage = 'ไม่พบข้อมูลที่ร้องขอ';

    const appError = new Error(errorMessage) as Error & { status?: number };
    appError.status = status;
    throw appError;
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('text/plain')) {
    return response.text() as unknown as T;
  }
  return response.json();
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(url, { ...options, headers, credentials: 'include' });
  return handleResponse<T>(response);
}

async function requestNoInterceptor<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  const response = await fetch(url, { ...options, headers, credentials: 'include' });
  return handleResponse<T>(response);
}

function buildParams(params?: Record<string, any>): URLSearchParams {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    });
  }
  return searchParams;
}

export class AuthApiDataSource {
  private get baseUrl(): string {
    return getBaseUrl();
  }

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.auth.login}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return {
      accessToken: raw.access_token,
      refreshToken: raw.refresh_token,
      expiresIn: raw.expires_in,
      tokenType: raw.token_type,
      user: raw.user || null,
    };
  }

  async signIn(data: SignInRequestDto): Promise<LoginResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.auth.signin}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return {
      accessToken: raw.access_token,
      refreshToken: raw.refresh_token,
      expiresIn: raw.expires_in,
      tokenType: raw.token_type,
      user: raw.user || null,
    };
  }

  async logout(): Promise<void> {
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.auth.logout}`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async logoutAll(): Promise<void> {
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.auth.logoutall}`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async refreshToken(): Promise<LoginResponseDto> {
    return requestNoInterceptor<LoginResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.refresh}`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async forgotPassword(email: string): Promise<void> {
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.auth.forgotPassword}`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(code: string, data: ResetPasswordRequestDto): Promise<void> {
    const params = buildParams({ code });
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.auth.resetPassword}?${params.toString()}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async verifyEmail(code: string): Promise<string> {
    const params = buildParams({ code });
    return request<string>(`${this.baseUrl}${API_ENDPOINTS.auth.verifyEmail}?${params.toString()}`, {
      method: 'GET',
    });
  }

  async getPublicKey(): Promise<PublicKeyResponseDto> {
    return request<PublicKeyResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.publicKey}`, {
      method: 'GET',
    });
  }

  async getCurrentUser(): Promise<UserResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.auth.me}`, {
      method: 'GET',
    });
    return raw?.data ?? raw;
  }

  async updateProfile(data: Partial<UserResponseDto>): Promise<UserResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.users.updateMe}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return raw?.data ?? raw;
  }

  async changeMyPassword(data: ChangePasswordRequestDto): Promise<void> {
    const body = {
      old_password: data.currentPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword,
    };
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.users.changeMyPassword}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async register(data: RegisterRequestDto): Promise<void> {
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.auth.register}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPermissions(): Promise<string[]> {
    return request<string[]>(`${this.baseUrl}${API_ENDPOINTS.auth.permissions}`, {
      method: 'GET',
    });
  }

  async listUsers(params?: UserListParams): Promise<{ data: UserResponseDto[]; total: number }> {
    const { roleId, activeStatus, pageSize, ...rest } = params || {};
    const queryParams: Record<string, any> = {
      ...rest,
      ...(activeStatus !== undefined && activeStatus !== null ? { active_status: activeStatus } : {}),
      ...(pageSize !== undefined && pageSize !== null ? { page_size: pageSize } : {}),
      ...(roleId !== undefined && roleId !== null ? { role_id: roleId } : {}),
    };
    const searchParams = buildParams(queryParams);
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.users.list}?${searchParams.toString()}`, {
      method: 'GET',
    });
    const body = raw?.data ?? raw;
    const payload = body?.payload ?? body;
    const total = body?.pagination?.total ?? (Array.isArray(payload) ? payload.length : 0);
    return { data: payload || [], total };
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.users.detail(id)}`, {
      method: 'GET',
    });
    return raw?.data ?? raw;
  }

  async createUser(data: RegisterRequestDto): Promise<UserResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.users.create}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return raw?.data ?? raw;
  }

  async updateUser(id: string, data: Partial<UserResponseDto>): Promise<UserResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.users.update(id)}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return raw?.data ?? raw;
  }

  async deleteUser(id: string): Promise<void> {
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.users.delete(id)}`, {
      method: 'DELETE',
    });
  }

  async updateUserRole(id: string, roleId: number): Promise<void> {
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.users.updateRole(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ role_id: roleId }),
    });
  }

  async updateUserPassword(id: string, oldPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.users.updatePassword(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword }),
    });
  }

  async forceLogoutUser(id: string): Promise<void> {
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.users.logoutall(id)}`, {
      method: 'GET',
    });
  }

  async getRoles(): Promise<RoleListResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.roles.list}`, {
      method: 'GET',
    });
    return raw?.data ?? raw;
  }

  async getRole(id: number): Promise<RoleResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.roles.detail(id)}`, {
      method: 'GET',
    });
    return raw?.data ?? raw;
  }

  async createRole(data: CreateRoleRequestDto): Promise<RoleResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.roles.create}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return raw?.data ?? raw;
  }

  async updateRole(id: number, data: UpdateRoleRequestDto): Promise<RoleResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.roles.update(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return raw?.data ?? raw;
  }

  async deleteRole(id: number): Promise<void> {
    await request<void>(`${this.baseUrl}${API_ENDPOINTS.roles.delete(id)}`, {
      method: 'DELETE',
    });
  }

  async assignRolePermissions(id: number, data: AssignRolePermissionsRequestDto): Promise<RoleResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.roles.permissions(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return raw?.data ?? raw;
  }

  async getAllPermissions(): Promise<PermissionListResponseDto> {
    const raw = await request<any>(`${this.baseUrl}${API_ENDPOINTS.permissions.list}`, {
      method: 'GET',
    });
    return raw?.data ?? raw;
  }
}
