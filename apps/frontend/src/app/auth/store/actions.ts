import { createAction, props } from '@ngrx/store';
import { AuthCredentials, AuthResponse } from '../../models/auth.model';

export const login = createAction('[Auth] Login', props<{ credentials: AuthCredentials }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{response: AuthResponse}>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');
