import { Injectable } from '@angular/core'
import { Observable  } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import { RefreshTokenRequest,TokenEndPointRequest,TokenEndPointResponse } from '../models/Token'
import { environment } from '../../environments/environment'
//import * as queryString from 'query-string'
import queryString from 'query-string'
import { WebHttpUrlEncodingCodec } from '../encoder'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private access_token: string
  private id_token: string
  private refresh_token: string
  private expires_in: string
  private scope: string
  private token_type: string
  private isAuthorized: string="0"

  // https://dev-academy.com/angular-jwt/
  constructor(private http: HttpClient) {}

  /**
   * アクセストークンの保存
   * @param TokenEndPointResponse Tokenエンドポイントからの応答
   */
  setTokenInfo(resp: TokenEndPointResponse) {
    // F5した際にaccessTokenが空になるのを防ぐため、sessionStorageを使用する方法に変更
    console.log("TokenService: access_token: "+resp.access_token)
    console.log("TokenService: id_token: "+resp.id_token)
    console.log("TokenService: refresh_token: "+resp.refresh_token)
    console.log("TokenService: setExpire: "+resp.expires_in)
    console.log("TokenService: scope: "+resp.scope)
    console.log("TokenService: token_type: "+resp.token_type)

    sessionStorage.setItem('access_token', resp.access_token)
    sessionStorage.setItem('id_token', resp.id_token)
    sessionStorage.setItem('refresh_token', resp.refresh_token)
    sessionStorage.setItem('expires_in', resp.expires_in)
    sessionStorage.setItem('scope', resp.scope)
    sessionStorage.setItem('token_type', resp.token_type)
    
    this.access_token=resp.access_token
    this.id_token=resp.id_token
    this.refresh_token=resp.refresh_token
    this.expires_in=resp.expires_in
    this.scope=resp.scope
    this.token_type=resp.token_type
  }

  removeTokens() {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('id_token')
    sessionStorage.removeItem('refresh_token')
    sessionStorage.removeItem('expires_in')
    sessionStorage.removeItem('scope')
    sessionStorage.removeItem('token_type')

    this.access_token=''
    this.id_token=''
    this.refresh_token=''
    this.expires_in=''
    this.scope=''
    this.token_type=''
  }  

  getAccessToken() {
    const token = sessionStorage.getItem('access_token')
    return token
    //return this.access_token
  }  
  getIdToken() {
    const token = sessionStorage.getItem('id_token')
    return token
    //return this.access_token
  }  
  getRefreshToken() {
    const token = sessionStorage.getItem('refresh_token')
    return token
    //return this.refresh_token
  }  
  getScope() {
    const token = sessionStorage.getItem('scope')
    return token
    //return this.scope
  }  
  getIsAuthorized() {
    return sessionStorage.getItem('isAuthorized')
    //return this.isAuthorized
  }  
  setIsAuthorized(val:string) {
    this.isAuthorized=val
    sessionStorage.setItem('isAuthorized', val)
  } 

  refreshToken(token: { refreshToken: string, scope: string }): Observable<TokenEndPointResponse> {
    console.log('RefreshToken called')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    }    
  
    const body: RefreshTokenRequest = {
      client_id: environment.auth.clientId,
      refresh_token: token.refreshToken,
      scope: token.scope,
      grant_type: 'refresh_token'
    }
    var post_body = queryString.stringify(body)    
  
    return this.http.post<TokenEndPointResponse>(environment.auth.tokenUri, post_body,httpOptions)
    .pipe(
      tap((tokens) => {
        this.setTokenInfo(tokens)
      })
    )
  }

  Logout(token: { IdTokenHint: string }): void {
    console.log('logout called')
 
    let logoutUrl: string
    logoutUrl = environment.auth.logoutUri
    let params = new HttpParams({ encoder: new WebHttpUrlEncodingCodec() })

    if (token.IdTokenHint) {
      params = params.set('id_token_hint', token.IdTokenHint)
    }
    params = params.set('post_logout_redirect_uri', environment.auth.post_logout_redirect_uri)
    params = params.set('frontchannel_logout_uri', environment.auth.frontchannel_logout_uri)

    //let state = '12345'
    //params = params.set('state', state)

    logoutUrl=logoutUrl+'?'+params.toString()
    console.log(logoutUrl)

    window.location.href=logoutUrl
  }

  getAccessTokenFromResponse(token: { code: string }) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    }    

    const code_verifier: string=sessionStorage.getItem('code_verifier')

    const body: TokenEndPointRequest = {
      client_id: environment.auth.clientId,
      grant_type: 'authorization_code',
      code: token.code,
      code_verifier: code_verifier,
      redirect_uri: environment.auth.redirectUri
    }
    sessionStorage.removeItem('code_verifier')
    console.log(body.redirect_uri)

    // https://sagatto.com/20200128_query-string_vuejs
    //   npm install query-string
    //   npm install @types/query-string
    var post_body = queryString.stringify(body)    
    console.log(post_body)

    return new Promise<void>( (resolve, reject) => {
      this.http.post<TokenEndPointResponse>(environment.auth.tokenUri, post_body, httpOptions ).subscribe( data => {
        // アクセストークン保存
        this.setTokenInfo(data)
        resolve()
      })
    })
  }


}
