export const environment = 
{
  "production":"true",
  "env":"production",
  "auth":{
    "clientId":"xxxxx",
    "authUri":"https://webgw.localdomain/irisauth/authserver/oauth2/authorize",
    "logoutUri":"https://webgw.localdomain/irisauth/authserver/oauth2/logout",
    "tokenUri":"https://webgw.localdomain/irisauth/authserver/oauth2/token",
    "redirectUri":"https://webgw.localdomain/myapp/#/callback",
    "scope":"openid scope1",
    "frontchannel_logout_uri":"https://webgw.localdomain/myapp/#/logout",
    "post_logout_redirect_uri":"https://webgw.localdomain/myapp/#/home"
  },
  "rsc":{
    "resourceServerUri":"https://webgw.localdomain/irisrsc/csp/myrsc/private",
    "resourceServer2Uri":"https://webgw.localdomain/irisrsc2/csp/myrsc/private"
  },
  "iam":{
    "resourceServerInfo":"https://webgw.localdomain:8443/MYAPP/",
    "resourceServerUri":"https://webgw.localdomain:8443/MYAPP/public",
    "resourceServer2Uri":"https://webgw.localdomain:8443/MYAPP2/public"
  },
  "bff":{
    "BFFServer":"/irisclient/csp/bffapi",
    "redirectUri":"https://webgw.localdomain/myapp/#/callback-bff"
  }
}
