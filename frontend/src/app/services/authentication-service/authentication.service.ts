import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { ApiConfiguration } from '../api-configuration';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { StrictHttpResponse } from '../strict-http-response';
import { AuthenticationResponse } from '../models/authentication-response';
import { AuthenticateParams } from './interfaces/authenticate-params';
import { RegisterParams } from './interfaces/register-params';
import { ConfirmParams } from './interfaces/confirm-params';
import { authenticate } from './api/authentication/authenticate';
import { register } from './api/authentication/register';
import { confirm } from './api/authentication/confirm';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  static readonly RegisterPath = '/auth/register'

  registerResponse(params: RegisterParams, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
    return register(this.http, this.rootUrl, params, context);
  }

  register(params: RegisterParams, context?: HttpContext): Observable<{}> {
    return this.registerResponse(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );        
  }
  
  static readonly AuthenticatePath = '/auth/authenticate';
  
  authenticateResponse(params: AuthenticateParams, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }
  
  authenticate(params: AuthenticateParams, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authenticateResponse(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }
  
  static readonly ConfirmPath = '/auth/activate-account';
  
  confirmResponse(params: ConfirmParams, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return confirm(this.http, this.rootUrl, params, context);
  }

  confirm(params: ConfirmParams, context?: HttpContext): Observable<void> {
    return this.confirmResponse(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
