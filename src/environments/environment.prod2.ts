export const environment = 
{
  "production":"true",
  "env":"production2",
  "auth":{
    "clientId":"xxxxx",
    "authUri":"https://webgw.localdomain/irisauth/authserver/oauth2/authorize",
    "logoutUri":"https://webgw.localdomain/irisauth/authserver/oauth2/logout",
    "tokenUri":"https://webgw.localdomain/irisauth/authserver/oauth2/token",
    "redirectUri":"https://webgw.localdomain/myapp2/#/callback",
    "scope":"openid scope1",
    "frontchannel_logout_uri":"https://webgw.localdomain/myapp2/#/logout",
    "post_logout_redirect_uri":"https://webgw.localdomain/myapp2/#/home"
  },
  "rsc":{
    "resourceServerUri":"https://webgw.localdomain/irisrsc/csp/myapp/private",
    "resourceServer2Uri":"https://webgw.localdomain/irisrsc2/csp/myapp/private"
  },
  "iam":{
    "resourceServerInfo":"https://webgw.localdomain:8443/MYAPP/",
    "resourceServerUri":"https://webgw.localdomain:8443/MYAPP/public",
    "resourceServer2Uri":"https://webgw.localdomain:8443/MYAPP/public"
  },
  "bff":{
    "BFFServer":"/irisclient/csp/bff2api",
    "redirectUri":"https://webgw.localdomain/myapp2/#/callback-bff"
  }
}
