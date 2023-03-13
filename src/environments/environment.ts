export const environment = 
{
  "production":"false",
  "auth":{
    "clientId":"xxxxxxxx",
    "clientSecret":"yyyyyyyy",
    "authUri":"https://webgw.localdomain/irisauth/authserver/oauth2/authorize",
    "logoutUri":"https://webgw.localdomain/irisauth/authserver/oauth2/logout",
    "tokenUri":"https://webgw.localdomain/irisauth/authserver/oauth2/token",
    "redirectUri": 'http://webgw.localdomain:4200/myapp/#/callback',
    "scope":"openid scope1",
    "resourceServerUri":"https://webgw.localdomain/irisrsc/csp/MYAPP/private",
    "resourceServer2Uri":"https://webgw.localdomain/irisrsc2/csp/MYAPP/private",
    "frontchannel_logout_uri":"https://webgw.localdomain:4200/myapp/#/logout",
    "post_logout_redirect_uri":"https://webgw.localdomain:4200/myapp/#/home"
  },
  "iam":{
    "resourceServerInfo":"https://webgw.localdomain:8443/MYAPP/",
    "resourceServerUri":"https://webgw.localdomain:8443/MYAPP/public",
    "resourceServer2Uri":"https://webgw.localdomain:8443/MYAPP2/public"
  }
};
