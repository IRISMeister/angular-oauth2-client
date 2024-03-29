export const environment = 
{
  "production":"true",
  "env":"production2",
  "auth":{
    "OP":"iris",
    "clientId":"xxxxx",
    "authUri":"https://webgw.localdomain/irisauth/authserver/oauth2/authorize",
    "logoutUri":"https://webgw.localdomain/irisauth/authserver/oauth2/logout",
    "tokenUri":"https://webgw.localdomain/irisauth/authserver/oauth2/token",
    "userinfoUri":"https://webgw.localdomain/irisauth/authserver/oauth2/userinfo",
    "redirectUri":"https://webgw.localdomain/myapp2/#/callback",
    "scope":"openid profile scope1",
    "frontchannel_logout_uri":"https://webgw.localdomain/myapp2/#/logout",
    "post_logout_redirect_uri":"https://webgw.localdomain/myapp2/#/home"
  },
  "rsc":{
    "resourceServerUri":"https://webgw.localdomain/irisrsc/csp/myrsc/private",
    "resourceServer2Uri":"https://webgw.localdomain/irisrsc2/csp/myrsc/private"
  },
  "iam":{
    "resourceServerInfo":"https://webgw.localdomain:8443/myrsc/public",
    "resourceServerUri":"https://webgw.localdomain:8443/myrsc/private",
    "resourceServer2Uri":"https://webgw.localdomain:8443/myrsc2/private"
  },
  "bff":{
    "BFFServer":"/irisclient/csp/bff2api",
    "redirectUri":"https://webgw.localdomain/myapp2/#/callback-bff"
  }
}
