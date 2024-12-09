import { User } from "./user.model";

export interface AuthResponse {
	accessToken: string;
	user: User;
  }
  
  export interface AuthCredentials {
	email: string;
	password: string;
  }
  
  export interface AuthState {
	user: User | null;
	token: string | null;
	error: string | null;
	loading: boolean
  }
  