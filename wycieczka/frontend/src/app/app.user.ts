import { Role } from './app.role';
export interface User {
  id: string;
  userName: string;
  userRoles: Role[];
  email: string;
  isBanned: boolean;
}
