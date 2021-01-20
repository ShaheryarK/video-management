export interface User {
  confirmed: boolean;
  blocked: boolean;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  id: string;
}
export interface Role {
  name: string;
  description: string;
  type: string;
  id: string;
}
