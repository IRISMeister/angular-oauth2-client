// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientId: "xxxxxxxx",
    clientSecret: "yyyyyyyy",
    authUri: 'https://webgw.localdomain/irisauth/authserver/oauth2/authorize',
    tokenUri: 'https://webgw.localdomain/irisauth/authserver/oauth2/token',
    redirectUri: 'http://webgw.localdomain:4200/#/callback',
    _redirectUri: 'https://webgw.localdomain/#/callback',
    scope: 'openid scope1',
    resourceServerUri: 'https://webgw.localdomain/irisrsc/csp/MYAPP/private',
    resourceServer2Uri: 'https://webgw.localdomain/irisrsc2/csp/MYAPP/private'
  },
  iam: {
    resourceServerInfo: 'https://webgw.localdomain:8443/MYAPP/',
    resourceServerUri: 'https://webgw.localdomain:8443/MYAPP/public',
    resourceServer2Uri: 'https://webgw.localdomain:8443/MYAPP2/public'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
