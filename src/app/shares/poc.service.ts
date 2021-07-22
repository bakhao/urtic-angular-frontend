import { Injectable } from '@angular/core';
import { BaseRestService } from './rest/base-rest.service';
import { ConfigService } from 'src/app/config/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PocService extends BaseRestService {


  URL_POC_TAG = 'projects';

  getContext(): string {
    return this.URL_POC_TAG;
  }

  constructor(public configService: ConfigService, public http: HttpClient) {
    super(configService, http);
  }
}
