import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  success: boolean;
  token: string;
  tokenExpiry: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private loginUrl = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials);
  }
}
