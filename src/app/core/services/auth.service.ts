import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable, Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { environment } from '../../../environments/environment';
import { DecodedToken, LoginRequest, LoginResponse, User } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  tokenChanged$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) { }

  getToken(): Promise<string> {
    return this.storage.get(environment.storage.accessToken);
  }

  async decodeToken(): Promise<DecodedToken> {
    try {
      const token = await this.getToken();
      return jwt_decode(token);
    } catch (e) {
      return null;
    }
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getToken().then(token => {
        if (token) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(err => {
        resolve(false);
      });
    });
  }

  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const res: LoginResponse = await this.http.post<LoginResponse>(`${environment.api}/auth/login`, payload).toPromise();
      await this.storage.set(environment.storage.accessToken, res.access_token);
      this.tokenChanged$.next(true);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async logout() {
    await this.storage.clear();
    this.tokenChanged$.next(true);
    await this.router.navigate(['/login'], {replaceUrl: true});
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.api}/auth/profile`);
  }

}
