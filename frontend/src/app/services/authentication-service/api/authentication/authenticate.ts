import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { filter, map, Observable } from "rxjs";
import { StrictHttpResponse } from "../../../strict-http-response";
import { AuthenticationResponse } from "../../../models/authentication-response";
import { AuthenticateParams } from "../../interfaces/authenticate-params";
import { RequestBuilder } from "../../../request-builder";

export function authenticate(http: HttpClient, rootUrl: string, params: AuthenticateParams, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    const rb = new RequestBuilder(rootUrl, authenticate.PATH, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }
  
    return http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthenticationResponse>;
      })
    );
  }
  
  authenticate.PATH = '/auth/authenticate';