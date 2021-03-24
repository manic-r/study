import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpBackend, HttpClient, HttpRequest, HttpXhrBackend } from '@angular/common/http';
const yaml = require('js-yaml');

export type SuffixType = 'json' | 'yaml';
export type HttpType = HttpClient | HttpBackend;

export class TranslateYamlLoader implements TranslateLoader {

  responseType: 'json' | 'text' = 'json';

  constructor(
    private http: HttpType,
    private directory?: string,
    private prefix?: string,
    private suffix?: SuffixType) {
    suffix !== 'yaml' || (this.responseType = 'text');
    if (!!directory && (!directory.endsWith('\\') && !directory.endsWith('/'))) {
      this.directory = directory + '/';
    }
  }

  private handleReq(url: string): Observable<any> {
    if (this.http instanceof HttpClient) {
      return (this.http as HttpClient).request(
        new HttpRequest<any>('GET', url, { responseType: this.responseType })
      )
    } else if (this.http instanceof HttpXhrBackend) {
      return (this.http as HttpBackend).handle(
        new HttpRequest<any>('GET', url, { responseType: this.responseType })
      );
    }
    throw new Error('http类型应设置为`HttpClient | HttpBackend`');
  }

  private handleRes(obs: Observable<any>): Observable<any> {
    return forkJoin(obs).pipe(map(res => res[0].body))
      .pipe(
        catchError(_ => {
          return of(this.suffix === 'yaml' ? '' : {});
        })
      );
  }

  getTranslation(lang: string): Observable<any> {
    const url = `${this.directory}${this.prefix || ''}${lang}.${this.suffix}`;
    const response = this.handleRes(this.handleReq(url));
    return response.pipe(map(res => this.suffix === 'yaml' ? yaml.load(res) : res));
  }
}
