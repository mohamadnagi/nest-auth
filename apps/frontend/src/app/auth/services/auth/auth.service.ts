import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthResponse, AuthState } from '../../../models/auth.model';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private store = inject<Store<{ auth: AuthState }>>(Store);

  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post(`${this.apiUrl}auth/login`, payload).pipe(
      map((res: any)=> {
        return {
          user: res.data.user,
          accessToken: res.data.accessToken,
        };  
      })
    );
  }

  signup(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/register`, payload);
  }

  forgetPassword(email: string){
    return this.http.post(`${this.apiUrl}auth/forget-password`, {email: email});
  }

  resetPassword(payload: {password: string, token: string}){
    return this.http.post(`${this.apiUrl}auth/reset-password`, payload);
  }

  verifyResetPasswordToken(token: string){
    return this.http.post(`${this.apiUrl}auth/verify-reset-password-token`, {token});
  }

  logout(){
    this.store.dispatch(AuthActions.logout())
  }
}
