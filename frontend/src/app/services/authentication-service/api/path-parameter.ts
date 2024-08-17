import { ParameterOptions } from "../interfaces/parameter-options";
import { Parameter } from "./parameter";

export class PathParameter extends Parameter {
    constructor(name: string, value: any, options: ParameterOptions) {
      super(name, value, options, 'simple', false);
    }
  
    append(path: string): string {
      let value = this.value;
      if (value === null || value === undefined) {
        value = '';
      }
      let prefix = this.options.style === 'label' ? '.' : '';
      let separator = this.options.explode ? prefix === '' ? ',' : prefix : ',';
      let alreadySerialized = false;
      if (this.options.style === 'matrix') {
        prefix = `;${this.name}=`;
        if (this.options.explode && typeof value === 'object') {
          prefix = ';';
          if (value instanceof Array) {
            value = value.map(v => `${this.name}=${this.serializeValue(v, ';')}`);
            value = value.join(';');
            alreadySerialized = true;
          } else {
            value = this.serializeValue(value, ';');
            alreadySerialized = true
          }
        }
      }
      value = prefix + (alreadySerialized ? value : this.serializeValue(value, separator));
      path = path.replace(`{${this.name}}`, value);
      path = path.replace(`{${prefix}${this.name}${this.options.explode ? '*' : ''}}`, value);
      return path;
    }
  
    // @ts-ignore
    serializeValue(value: any, separator = ','): string {
      var result = typeof value === 'string' ? encodeURIComponent(value) : super.serializeValue(value, separator);
      result = result.replace(/%3D/g, '=');
      result = result.replace(/%3B/g, ';');
      result = result.replace(/%2C/g, ',');
      return result;
    }
  }