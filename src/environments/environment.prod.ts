export const environment = 
{
  "production":"true",
  "auth":{
    "clientId":"OJ1bLZLN5MLS0Z9S53I2ITXj3ukB41E3HnMbCxYYE6c",
    "clientSecret":"nspOUEY-fPa-BeGfhlZXw0dtQdGLcPtEhRJNn_jzEH7_4H_McS6FfKPl1tcoYLT5Adsr-65lvgff9uw6OJoubg",
    "authUri":"https://webgw.localdomain/irisauth/authserver/oauth2/authorize",
    "logoutUri":"https://webgw.localdomain/irisauth/authserver/oauth2/logout",
    "tokenUri":"https://webgw.localdomain/irisauth/authserver/oauth2/token",
    "redirectUri":"https://webgw.localdomain/myapp/#/callback",
    "scope":"openid scope1",
    "resourceServerUri":"https://webgw.localdomain/irisrsc/csp/MYAPP/private",
    "resourceServer2Uri":"https://webgw.localdomain/irisrsc2/csp/MYAPP/private",
    "frontchannel_logout_uri":"https://webgw.localdomain/myapp/#/logout",
    "post_logout_redirect_uri":"https://webgw.localdomain/myapp/#/home"
  },
  "iam":{
    "resourceServerInfo":"https://webgw.localdomain:8443/MYAPP/",
    "resourceServerUri":"https://webgw.localdomain:8443/MYAPP/public",
    "resourceServer2Uri":"https://webgw.localdomain:8443/MYAPP2/public"
  }
};
