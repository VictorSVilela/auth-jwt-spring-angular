import { HttpParams } from "@angular/common/http";
import { Parameter } from "./parameter";
import { ParameterOptions } from "../interfaces/parameter-options";

export class QueryParameter extends Parameter {
    constructor(name: string, value: any, options: ParameterOptions) {
      super(name, value, options, 'form', true);
    }
  
    append(params: HttpParams): HttpParams {
      if (this.value instanceof Array) {
        if (this.options.explode) {
          for (const v of this.value) {
            params = params.append(this.name, this.serializeValue(v));
          }
        } else {
          const separator = this.options.style === 'spaceDelimited'
            ? ' ' : this.options.style === 'pipeDelimited'
              ? '|' : ',';
          return params.append(this.name, this.serializeValue(this.value, separator));
        }
      } else if (this.value !== null && typeof this.value === 'object') {
        if (this.options.style === 'deepObject') {
          for (const key of Object.keys(this.value)) {
            const propVal = this.value[key];
            if (propVal !== null && propVal !== undefined) {
              params = params.append(`${this.name}[${key}]`, this.serializeValue(propVal));
            }
          }
        } else if (this.options.explode) {
          for (const key of Object.keys(this.value)) {
            const propVal = this.value[key];
            if (propVal !== null && propVal !== undefined) {
              params = params.append(key, this.serializeValue(propVal));
            }
          }
        } else {
          const array: any[] = [];
          for (const key of Object.keys(this.value)) {
            const propVal = this.value[key];
            if (propVal !== null && propVal !== undefined) {
              array.push(key);
              array.push(propVal);
            }
          }
          params = params.append(this.name, this.serializeValue(array));
        }
      } else if (this.value !== null && this.value !== undefined) {
        params = params.append(this.name, this.serializeValue(this.value));
      }
      return params;
    }
  }