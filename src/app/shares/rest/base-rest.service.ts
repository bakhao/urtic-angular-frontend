import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from 'src/app/config/config.service';
import { Observable, Observer, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export abstract class BaseRestService {
  private CODE_401 = 401;
  private CODE_500 = 500;
  constructor(public configService: ConfigService,
    public http: HttpClient) { }

  abstract getContext(): string;

  public handleError(err: HttpErrorResponse) {
    switch (err.status) {
      case this.CODE_401:
        console.log('error 401');
        return throwError(err);
      case this.CODE_500:
        this.configService.validError.emit();
        return throwError(err);
      default:
        return throwError(err);
    }
  }
  // tslint:disable-next-line:ban-types
  public get(id: number, callback?: Function) {
    return this.httpGet(this.configService.environmentConfig.getApiServer() + this.getContext() + id, callback);
  }
  // tslint:disable-next-line:ban-types
  public delete(id: number, callback?: Function) {
    return this.httpDelete(this.configService.environmentConfig.getApiServer() + this.getContext() + id, callback);
  }
  // tslint:disable-next-line:ban-types
  public getFile(id: number, callback?: Function) {
    return this.httpGet(this.configService.environmentConfig.getApiServer() + '/attachment/' + id, callback, 'blob');
  }
  // tslint:disable-next-line:ban-types
  public getAll(callback?: Function) {
    return this.httpGet(this.configService.environmentConfig.getApiServer() + this.getContext(), callback);
  }

  // tslint:disable-next-line:ban-types
  public postFile(file: any, callback?: Function) {

    return this.httpPost(this.configService.environmentConfig.getApiServer() + this.getContext(),
      file, callback);
  }

  public createHeader(responseContentType?: any) {
    const header = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache'
      }),
      responseContentType
    };
    return header;
  }
  // tslint:disable-next-line:ban-types
  public httpGet(url: string, callback?: Function, responseType?: string) {
    return this.http.get(url, this.createHeader(responseType ? responseType : 'text')).pipe(
      map((data) => {
        if (callback) {
          callback(data);
        }
        return data;
      }),
      catchError(this.handleError)
    );
  }

  // tslint:disable-next-line:ban-types
  public httpPost(url: string, model: any, callback?: Function, responseType?: string) {
    return this.http.post(url, model, this.createHeader(responseType ? responseType : 'json')).subscribe((data) => {
      if (callback) {
        return callback(data);
      }
      return data;
    },
      error => this.handleError(error)
    );
  }

  // tslint:disable-next-line:ban-types
  public httpPut(url: string, model: any, callback?: Function, responseType?: string) {
    return this.http.put(url, model, this.createHeader(responseType ? responseType : 'json')).subscribe((data) => {
      if (callback) {
        return callback(data);
      }
      return data;
    },
      error => this.handleError(error)
    );
  }

  // tslint:disable-next-line:ban-types
  public httpDelete(url: string, callback?: Function, responseType?: string) {
    return this.http.delete(url, this.createHeader(responseType ? responseType : 'json')).subscribe((data) => {
      if (callback) {
        return callback(data);
      }
      return data;
    },
      error => this.handleError(error)
    );
  }
}
