import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig } from './models/environment.config';
import * as config from '../../assets/environment.json';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigService {

    @Output() validError: EventEmitter<any> = new EventEmitter();
    environmentConfig: EnvironmentConfig;

    constructor(private http: HttpClient) {
        this.environmentConfig = new EnvironmentConfig();
    }

    loadConfiguration(): Promise<any> {
        return new Promise<boolean>((resolve: (a: boolean) => void): void => {
            this.environmentConfig.setApiServer(config['apiServer']);
            resolve(true);
        });
    }

}
