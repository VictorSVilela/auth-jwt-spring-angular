import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { RequestBuilder } from "../../../request-builder";
import { filter, map, Observable } from "rxjs";
import { StrictHttpResponse } from "../../../strict-http-response";
import { ConfirmParams } from "../../interfaces/confirm-params";

export function confirm(http: HttpClient, rootUrl: string, params: ConfirmParams, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(rootUrl, confirm.PATH, 'get');
    if (params) {
      rb.query('token', params.token, {});
    }
  
    return http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }
  
  confirm.PATH = '/auth/activate-account';