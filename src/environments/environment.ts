export const environment = 
{
  "production":"false",
  "auth":{
    "clientId":"xxxxx",
    "authUri":"https://webgw.localdomain/irisauth/authserver/oauth2/authorize",
    "logoutUri":"https://webgw.localdomain/irisauth/authserver/oauth2/logout",
    "tokenUri":"https://webgw.localdomain/irisauth/authserver/oauth2/token",
    "redirectUri":"http://webgw.localdomain:4200/myapp/#/callback",
    "scope":"openid scope1",
    "frontchannel_logout_uri":"http://webgw.localdomain:4200/myapp/#/logout",
    "post_logout_redirect_uri":"http://webgw.localdomain:4200/myapp/#/home"
  },
  "rsc":{
    "resourceServerUri":"https://webgw.localdomain/irisrsc/csp/myapp/private",
    "resourceServer2Uri":"https://webgw.localdomain/irisrsc2/csp/myapp/private"
  },
  "iam":{
    "resourceServerInfo":"https://webgw.localdomain:8443/MYAPP/",
    "resourceServerUri":"https://webgw.localdomain:8443/MYAPP/public",
    "resourceServer2Uri":"https://webgw.localdomain:8443/MYAPP2/public"
  },
  "bff":{
    "BFFServer":"/irisclient/csp/bffapi",
    "redirectUri":"http://webgw.localdomain:4200/myapp/#/callback-bff"
  }
}
