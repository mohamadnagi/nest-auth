// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './actions';
import { AuthState } from '../../models/auth.model';

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    user: response.user,
    token: response.accessToken,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
on(AuthActions.logout, (state) => {
  const updatedState = {
    user: null,
    token: null,
    loading: false,
    error: null,
  };
  return updatedState;
}),  
);
