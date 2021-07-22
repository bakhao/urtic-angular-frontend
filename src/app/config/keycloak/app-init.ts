import { KeycloakService } from 'keycloak-angular';
import * as keycloakConfig from '../../../assets/keycloak.json';
import { KeycloakOnLoad } from 'keycloak-js';


export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init({
      config: {
          url: keycloakConfig['config']['url'],//'http://localhost:8080/auth',
          realm: keycloakConfig['config']['realm'],//'Urtic',
          clientId: keycloakConfig['config']['clientId']//'UrticUI'
      },
      initOptions: {
        onLoad: keycloakConfig['initOptions']['onLoad'] as KeycloakOnLoad,//'login-required',
        checkLoginIframe: keycloakConfig['initOptions']['checkLoginIframe']//false
    },
      enableBearerInterceptor: keycloakConfig['enableBearerInterceptor'],//true,
      bearerPrefix: keycloakConfig['bearerPrefix'],//'Bearer',
      bearerExcludedUrls: keycloakConfig['bearerExcludedUrls']/*[
          '/assets',
          '/clients/public']*/
  });
}
