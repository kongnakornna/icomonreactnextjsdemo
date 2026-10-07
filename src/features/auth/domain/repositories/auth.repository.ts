import { User, LoginCredentials, SignInCredentials, AuthResponse, PublicKeyResponse, VerifyEmailCredentials } from '../entities/user.entity';
import { Role, CreateRoleRequest, UpdateRoleRequest, AssignRolePermissionsRequest } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';

export interface RegisterCredentials {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  mobileNumber: string;
  lineId: string;
  locationId: string;
  roleId: number;
}

export interface ChangeMyPasswordCredentials {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordCredentials {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserListParams {
  limit?: number;
  offset?: number;
  keyword?: string;
  email?: string;
  username?: string;
  status?: string;
  activeStatus?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
  roleId?: string;
  verified?: boolean;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  signIn(credentials: SignInCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  logoutAll(): Promise<void>;
  refreshToken(): Promise<AuthResponse>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(credentials: ResetPasswordCredentials): Promise<void>;
  verifyEmail(credentials: VerifyEmailCredentials): Promise<string>;
  getPublicKey(): Promise<PublicKeyResponse>;
  changeMyPassword(credentials: ChangeMyPasswordCredentials): Promise<void>;
  register?(credentials: RegisterCredentials): Promise<void>;
  getCurrentUser(): Promise<User>;
  updateProfile(profile: Partial<User>): Promise<User>;
  getPermissions(): Promise<string[]>;
  hasPermission(permission: string): Promise<boolean>;
  listUsers(params?: UserListParams): Promise<{ data: User[]; total: number }>;
  getUserById(id: string): Promise<User>;
  createUser(credentials: RegisterCredentials): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  updateUserRole(id: string, roleId: number): Promise<void>;
  updateUserPassword(id: string, oldPassword: string, newPassword: string, confirmPassword: string): Promise<void>;
  forceLogoutUser(id: string): Promise<void>;
  getRoles(): Promise<Role[]>;
  getRole(id: number): Promise<Role>;
  createRole(request: CreateRoleRequest): Promise<Role>;
  updateRole(id: number, request: UpdateRoleRequest): Promise<Role>;
  deleteRole(id: number): Promise<void>;
  assignRolePermissions(id: number, request: AssignRolePermissionsRequest): Promise<Role>;
  getAllPermissions(): Promise<Permission[]>;
}
