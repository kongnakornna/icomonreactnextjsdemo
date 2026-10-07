import { IAuthRepository, RegisterCredentials, ChangeMyPasswordCredentials, ResetPasswordCredentials, UserListParams } from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, SignInCredentials, AuthResponse, VerifyEmailCredentials, PublicKeyResponse } from '../../domain/entities/user.entity';
import { Role, CreateRoleRequest, UpdateRoleRequest, AssignRolePermissionsRequest } from '../../domain/entities/role.entity';
import { Permission } from '../../domain/entities/permission.entity';
import { AuthApiDataSource } from '../datasources/auth.api.datasource';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { RoleResponseDto } from '../dtos/role.dto';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

export class AuthRepositoryImpl implements IAuthRepository {
  private dataSource: AuthApiDataSource;
  private currentUserCache?: { user: User; at: number };
  private readonly USER_CACHE_TTL = 30_000;

  constructor(dataSource?: AuthApiDataSource) {
    this.dataSource = dataSource || new AuthApiDataSource();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const dto = await this.dataSource.login({ username: credentials.username, password: credentials.password });
    localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, dto.accessToken);
    localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, dto.refreshToken);
    const tokens = this.mapToTokens(dto);
    const userDto = await this.dataSource.getCurrentUser();
    return { ...tokens, user: this.mapToUser(userDto) };
  }

  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const dto = await this.dataSource.signIn({ email: credentials.email, password: credentials.password });
    localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, dto.accessToken);
    localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, dto.refreshToken);
    const tokens = this.mapToTokens(dto);
    const userDto = await this.dataSource.getCurrentUser();
    return { ...tokens, user: this.mapToUser(userDto) };
  }

  async logout(): Promise<void> {
    this.currentUserCache = undefined;
    return this.dataSource.logout();
  }

  async logoutAll(): Promise<void> {
    this.currentUserCache = undefined;
    return this.dataSource.logoutAll();
  }

  async refreshToken(): Promise<AuthResponse> {
    const dto = await this.dataSource.refreshToken();
    localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, dto.accessToken);
    localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, dto.refreshToken);
    const tokens = this.mapToTokens(dto);
    const userDto = await this.dataSource.getCurrentUser();
    return { ...tokens, user: this.mapToUser(userDto) };
  }

  async forgotPassword(email: string): Promise<void> {
    return this.dataSource.forgotPassword(email);
  }

  async resetPassword(credentials: ResetPasswordCredentials): Promise<void> {
    return this.dataSource.resetPassword(credentials.code, {
      new_password: credentials.newPassword,
      confirm_password: credentials.confirmPassword,
    });
  }

  async verifyEmail(credentials: VerifyEmailCredentials): Promise<string> {
    return this.dataSource.verifyEmail(credentials.code);
  }

  async getPublicKey(): Promise<PublicKeyResponse> {
    const dto = await this.dataSource.getPublicKey();
    return {
      publicKeyAccessToken: dto.public_key_access_token,
      publicKeyRefreshToken: dto.public_key_refresh_token,
    };
  }

  async changeMyPassword(credentials: ChangeMyPasswordCredentials): Promise<void> {
    return this.dataSource.changeMyPassword(credentials);
  }

  async getCurrentUser(): Promise<User> {
    const cached = this.currentUserCache;
    if (cached && Date.now() - cached.at < this.USER_CACHE_TTL) {
      return cached.user;
    }
    const dto = await this.dataSource.getCurrentUser();
    const user = this.mapToUser(dto);
    this.currentUserCache = { user, at: Date.now() };
    return user;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const dto = await this.dataSource.updateProfile(this.mapToUpdateDto(data));
    const user = this.mapToUser(dto);
    this.currentUserCache = { user, at: Date.now() };
    return user;
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    return this.dataSource.register(this.mapToRegisterDto(credentials));
  }

  async hasPermission(permission: string): Promise<boolean> {
    const perms = await this.dataSource.getPermissions();
    return perms.includes(permission);
  }

  async getPermissions(): Promise<string[]> {
    return this.dataSource.getPermissions();
  }

  async listUsers(params?: UserListParams): Promise<{ data: User[]; total: number }> {
    const response = await this.dataSource.listUsers(params);
    return {
      data: response.data.map((dto) => this.mapToUser(dto)),
      total: response.total,
    };
  }

  async getUserById(id: string): Promise<User> {
    const dto = await this.dataSource.getUserById(id);
    return this.mapToUser(dto);
  }

  async createUser(credentials: RegisterCredentials): Promise<User> {
    const dto = await this.dataSource.createUser(this.mapToRegisterDto(credentials));
    return this.mapToUser(dto);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const dto = await this.dataSource.updateUser(id, this.mapToUpdateDto(data));
    return this.mapToUser(dto);
  }

  async deleteUser(id: string): Promise<void> {
    return this.dataSource.deleteUser(id);
  }

  async updateUserRole(id: string, roleId: number): Promise<void> {
    return this.dataSource.updateUserRole(id, roleId);
  }

  async updateUserPassword(id: string, oldPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    return this.dataSource.updateUserPassword(id, oldPassword, newPassword, confirmPassword);
  }

  async forceLogoutUser(id: string): Promise<void> {
    return this.dataSource.forceLogoutUser(id);
  }

  async getRoles(): Promise<Role[]> {
    const response = await this.dataSource.getRoles();
    return response.roles.map((dto) => this.mapRoleDtoToEntity(dto));
  }

  async getRole(id: number): Promise<Role> {
    const dto = await this.dataSource.getRole(id);
    return this.mapRoleDtoToEntity(dto);
  }

  async createRole(request: CreateRoleRequest): Promise<Role> {
    const dto = await this.dataSource.createRole({
      name: request.name,
      description: request.description,
      permissions: request.permissions,
      is_default: request.isDefault,
    });
    return this.mapRoleDtoToEntity(dto);
  }

  async updateRole(id: number, request: UpdateRoleRequest): Promise<Role> {
    const dto = await this.dataSource.updateRole(id, {
      name: request.name,
      description: request.description,
      permissions: request.permissions,
      is_default: request.isDefault,
    });
    return this.mapRoleDtoToEntity(dto);
  }

  async deleteRole(id: number): Promise<void> {
    return this.dataSource.deleteRole(id);
  }

  async assignRolePermissions(id: number, request: AssignRolePermissionsRequest): Promise<Role> {
    const dto = await this.dataSource.assignRolePermissions(id, { permissions: request.permissions });
    return this.mapRoleDtoToEntity(dto);
  }

  async getAllPermissions(): Promise<Permission[]> {
    const response = await this.dataSource.getAllPermissions();
    return response.permissions.map((dto) => this.mapPermissionDtoToEntity(dto));
  }

  private mapRoleDtoToEntity(dto: RoleResponseDto): Role {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      permissions: dto.permissions,
      isDefault: dto.is_default,
      createdAt: new Date(dto.created_at),
      updatedAt: new Date(dto.updated_at),
    };
  }

  private mapPermissionDtoToEntity(dto: { id: number; name: string; description: string; module: string }): Permission {
    return {
      id: dto.id.toString(),
      name: dto.name,
      description: dto.description,
      module: dto.module,
    };
  }

  private mapToTokens(dto: LoginResponseDto): Pick<AuthResponse, 'accessToken' | 'refreshToken' | 'tokenType' | 'expiresIn'> {
    return {
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      tokenType: dto.tokenType,
      expiresIn: dto.expiresIn || 3600,
    };
  }

  private mapToUser(dto: UserResponseDto): User {
    return {
      id: dto.id,
      username: dto.username,
      email: dto.email,
      name: dto.fullname || `${dto.firstname || ''} ${dto.lastname || ''}`.trim() || dto.username,
      fullName: dto.fullname,
      firstName: dto.firstname,
      lastName: dto.lastname,
      status: dto.status?.toString() ?? '1',
      phoneNumber: dto.phone_number,
      mobileNumber: dto.mobile_number,
      profileImageUrl: null,
      role: dto.role_title || dto.role_id?.toString() || '',
      roleId: dto.role_id,
      permissions: [],
      isSuperuser: dto.is_superuser,
      verified: dto.verified,
      lineId: dto.line_id,
      locationId: dto.location_id,
      lastLogin: dto.last_sign_in ? new Date(dto.last_sign_in) : undefined,
      lastSignIn: dto.last_sign_in,
      createdAt: dto.createddate ? new Date(dto.createddate) : new Date(),
      createdDate: dto.createddate,
      updatedAt: dto.updateddate ? new Date(dto.updateddate) : new Date(),
      updatedDate: dto.updateddate,
    };
  }

  private mapToRegisterDto(credentials: RegisterCredentials): RegisterRequestDto {
    return {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      confirm_password: credentials.confirmPassword,
      firstname: credentials.firstName,
      lastname: credentials.lastName,
      fullname: credentials.fullName,
      phone_number: credentials.phoneNumber,
      mobile_number: credentials.mobileNumber,
      line_id: credentials.lineId,
      location_id: credentials.locationId,
      role_id: credentials.roleId,
    };
  }

  private mapToUpdateDto(data: Partial<User>): Partial<UserResponseDto> {
    const dto: Partial<UserResponseDto> = {};
    if (data.firstName !== undefined) dto.firstname = data.firstName;
    if (data.lastName !== undefined) dto.lastname = data.lastName;
    if (data.fullName !== undefined) dto.fullname = data.fullName;
    if (data.mobileNumber !== undefined) dto.mobile_number = data.mobileNumber;
    if (data.phoneNumber !== undefined) dto.phone_number = data.phoneNumber;
    if (data.lineId !== undefined) dto.line_id = data.lineId;
    if (data.locationId !== undefined) dto.location_id = data.locationId;
    return dto;
  }
}
