import { HttpHeaders } from "@angular/common/http";
import { ParameterOptions } from "../interfaces/parameter-options";
import { Parameter } from "./parameter";

export class HeaderParameter extends Parameter {
    constructor(name: string, value: any, options: ParameterOptions) {
      super(name, value, options, 'simple', false);
    }
  
    append(headers: HttpHeaders): HttpHeaders {
      if (this.value !== null && this.value !== undefined) {
        if (this.value instanceof Array) {
          for (const v of this.value) {
            headers = headers.append(this.name, this.serializeValue(v));
          }
        } else {
          headers = headers.append(this.name, this.serializeValue(this.value));
        }
      }
      return headers;
    }
  }