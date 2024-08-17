import { ParameterOptions } from "../interfaces/parameter-options";

export abstract class Parameter {
    constructor(public name: string, public value: any, public options: ParameterOptions, defaultStyle: string, defaultExplode: boolean) {
      this.options = options || {};
      if (this.options.style === null || this.options.style === undefined) {
        this.options.style = defaultStyle;
      }
      if (this.options.explode === null || this.options.explode === undefined) {
        this.options.explode = defaultExplode;
      }
    }
  
    serializeValue(value: any, separator = ','): string {
      if (value === null || value === undefined) {
        return '';
      } else if (value instanceof Array) {
        return value.map(v => this.serializeValue(v).split(separator).join(encodeURIComponent(separator))).join(separator);
      } else if (typeof value === 'object') {
        const array: string[] = [];
        for (const key of Object.keys(value)) {
          let propVal = value[key];
          if (propVal !== null && propVal !== undefined) {
            propVal = this.serializeValue(propVal).split(separator).join(encodeURIComponent(separator));
            if (this.options.explode) {
              array.push(`${key}=${propVal}`);
            } else {
              array.push(key);
              array.push(propVal);
            }
          }
        }
        return array.join(separator);
      } else {
        return String(value);
      }
    }
  }