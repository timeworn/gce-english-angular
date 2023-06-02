export enum Role {
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface User {
  id: string;
  username: string;
  role: Role;

  createdAt?: string;
  updatedAt?: string;
}

export interface DecodedToken {
  username: string;
  sub: string;
  role: Role;
  iat: number;
  exp: number;
}
