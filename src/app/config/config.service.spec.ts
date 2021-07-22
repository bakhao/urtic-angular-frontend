
import { ConfigService } from './config.service';
import { HttpClient, HttpInterceptor} from '@angular/common/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs';

describe('ConfigService', () => {
    let instanceTest: ConfigService;
    let backend: HttpInterceptor;
    let http: HttpClient;

    beforeEach(() => {
        backend = new MockBackend();
        http = new HttpClient(backend);
        instanceTest = new ConfigService(http);
    });

    it('should be created', () => {
        expect(beforeEach).toBeTruthy();
    });

    describe('when calling loadConfiguration', () => {
        let spyEnvironnementConfig: any;

        beforeEach(() => {
            spyEnvironnementConfig = spyOn(instanceTest, 'openEnvironnementConfigFile').and.stub();
        });

        it('should call openEnvironnementConfigFile', (done) => {
            instanceTest.loadConfiguration().then(() => {
                expect(spyEnvironnementConfig).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('when calling openEnvironnementConfigFile', () => {

        it('should call openFile with fileName and callback function', () => {
            const spy = spyOn(instanceTest, 'openFile').and.stub();
            instanceTest.openEnvironnementConfigFile();
            expect(spy).toHaveBeenCalledWith(instanceTest.ENVIRONMENT_CONFIG_FILE, jasmine.any(Function));
        });
    });

    describe('when calling setEnvironmentConfiguration', () => {
        it('should set environment configuration with config parameter', () => {
            const config = JSON.parse('{"apiServer":"Server"}');
            instanceTest.setEnvironmentConfiguration(config);
            expect(instanceTest.environmentConfig.getApiServer()).toBe('Server');
        });
    });

    describe('when calling openFile', () => {

        it('should call http get with good file name', () => {
            const fileName = 'filename';
            const spy = spyOn(instanceTest.http, 'get').and.returnValue(new Observable());
            instanceTest.openFile(fileName, () => { });
            expect(spy).toHaveBeenCalledWith(fileName);
        });

        it('should call callBack with json returned', (done) => {
            const response: Response = new Response(new ResponseOptions({
                body: JSON.stringify({ config: 'config' })
            }));
            backend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(response);
            });
            const spy = spyOn(instanceTest, 'setEnvironmentConfiguration').and.stub();
            instanceTest.openFile('fileName', (config) => { instanceTest.setEnvironmentConfiguration(config); }).then(() => {
                expect(spy).toHaveBeenCalledWith({ config: 'config' });
                done();
            });
        });
    });
});
