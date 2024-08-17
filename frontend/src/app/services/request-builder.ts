import { HttpContext, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { HeaderParameter } from "./authentication-service/api/header-parameter";
import { PathParameter } from "./authentication-service/api/path-parameter";
import { QueryParameter } from "./authentication-service/api/query-parameter";
import { ParameterCodec } from "./authentication-service/api/parameter-codec";
import { ParameterOptions } from "./authentication-service/interfaces/parameter-options";

const ParameterCodecInstance = new ParameterCodec();

export class RequestBuilder {

    private _path = new Map<string, PathParameter>();
    private _query = new Map<string, QueryParameter>();
    private _header = new Map<string, HeaderParameter>();
    _bodyContent: any | null;
    _bodyContentType?: string;   
  
    constructor(
      public rootUrl: string,
      public operationPath: string,
      public method: string) {
    }
  
    path(name: string, value: any, options?: ParameterOptions): void {
      this._path.set(name, new PathParameter(name, value, options || {}));
    }
  
    query(name: string, value: any, options?: ParameterOptions): void {
      this._query.set(name, new QueryParameter(name, value, options || {}));
    }
  
    header(name: string, value: any, options?: ParameterOptions): void {
      this._header.set(name, new HeaderParameter(name, value, options || {}));
    }
  
    body(value: any, contentType = 'application/json'): void {
      if (value instanceof Blob) {
        this._bodyContentType = value.type;
      } else {
        this._bodyContentType = contentType;
      }
      if (this._bodyContentType === 'application/x-www-form-urlencoded' && value !== null && typeof value === 'object') {
        const pairs: Array<[string, string]> = [];
        for (const key of Object.keys(value)) {
          let val = value[key];
          if (!(val instanceof Array)) {
            val = [val];
          }
          for (const v of val) {
            const formValue = this.formDataValue(v);
            if (formValue !== null) {
              pairs.push([key, formValue]);
            }
          }
        }
        this._bodyContent = pairs.map(p => `${encodeURIComponent(p[0])}=${encodeURIComponent(p[1])}`).join('&');
      } else if (this._bodyContentType === 'multipart/form-data') {
        const formData = new FormData();
        if (value !== null && value !== undefined) {
          for (const key of Object.keys(value)) {
            const val = value[key];
            if (val instanceof Array) {
              for (const v of val) {
                const toAppend = this.formDataValue(v);
                if (toAppend !== null) {
                  formData.append(key, toAppend);
                }
              }
            } else {
              const toAppend = this.formDataValue(val);
              if (toAppend !== null) {
                formData.set(key, toAppend);
              }
            }
          }
        }
        this._bodyContent = formData;
      } else {
        this._bodyContent = value;
      }
    }
    private formDataValue(value: any): any {
        if (value === null || value === undefined) {
          return null;
        }
        if (value instanceof Blob) {
          return value;
        }
        if (typeof value === 'object') {
          return new Blob([JSON.stringify(value)], {type: 'application/json'})
        }
        return String(value);
      }
    
      build<T = any>(options?: {
        accept?: string;
        responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
        reportProgress?: boolean;
        context?: HttpContext;
      }): HttpRequest<T> {
    
        options = options || {};
    
        // Path parameters
        let path = this.operationPath;
        for (const pathParam of this._path.values()) {
          path = pathParam.append(path);
        }
        const url = this.rootUrl + path;
    
        // Query parameters
        let httpParams = new HttpParams({
          encoder: ParameterCodecInstance
        });
        for (const queryParam of this._query.values()) {
          httpParams = queryParam.append(httpParams);
        }
    
        // Header parameters
        let httpHeaders = new HttpHeaders();
        if (options.accept) {
          httpHeaders = httpHeaders.append('Accept', options.accept);
        }
        for (const headerParam of this._header.values()) {
          httpHeaders = headerParam.append(httpHeaders);
        }
    
        
        if (this._bodyContentType && !(this._bodyContent instanceof FormData)) {
          httpHeaders = httpHeaders.set('Content-Type', this._bodyContentType);
        }
    
        return new HttpRequest<T>(this.method.toUpperCase(), url, this._bodyContent, {
          params: httpParams,
          headers: httpHeaders,
          responseType: options.responseType,
          reportProgress: options.reportProgress,
          context: options.context
        });
      }
    }