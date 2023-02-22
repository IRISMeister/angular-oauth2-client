import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { RefreshTokenRequest,TokenEndPointRequest,TokenEndPointResponse } from '../models/Token';
import { environment } from '../../environments/environment';
//import * as queryString from 'query-string';
import queryString from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  /*
  private access_token: string;
  private id_token: string;
  private refresh_token: string;
  private expires_in: string;
  private scope: string;
  private token_type: string;
  */

  // https://dev-academy.com/angular-jwt/
  constructor(private http: HttpClient) {}

  /**
   * アクセストークンの保存
   * @param TokenEndPointResponse Tokenエンドポイントからの応答
   */
  setTokenInfo(resp: TokenEndPointResponse) {
    // F5した際にaccessTokenが空になるのを防ぐため、localStorageを使用する方法に変更
    console.log("TokenService: access_token: "+resp.access_token);
    console.log("TokenService: id_token: "+resp.id_token);
    console.log("TokenService: refresh_token: "+resp.refresh_token);
    console.log("TokenService: setExpire: "+resp.expires_in);
    console.log("TokenService: scope: "+resp.scope);
    console.log("TokenService: token_type: "+resp.token_type);

    localStorage.setItem('access_token', resp.access_token);
    localStorage.setItem('id_token', resp.id_token);
    localStorage.setItem('refresh_token', resp.refresh_token);
    localStorage.setItem('expires_in', resp.expires_in);
    localStorage.setItem('scope', resp.scope);
    localStorage.setItem('token_type', resp.token_type);
    
    /*
    this.access_token=resp.access_token;
    this.id_token=resp.id_token;
    this.refresh_token=resp.refresh_token;
    this.expires_in=resp.expires_in;
    this.scope=resp.scope;
    this.token_type=resp.token_type;
    */
  }

  getAccessToken() {
    const token = localStorage.getItem('access_token');
    return token;
    //return this.access_token;
    
  }  
  getRefreshToken() {
    const token = localStorage.getItem('refresh_token');
    return token;
    //return this.refresh_token;
  }  
  getScope() {
    const token = localStorage.getItem('scope');
    return token;
    //return this.scope;
  }  


  refreshToken(token: { refreshToken: string, scope: string }): Observable<TokenEndPointResponse> {
    console.log('RefreshToken called');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };    
  
    const body: RefreshTokenRequest = {
      client_id: environment.auth.clientId,
      client_secret: environment.auth.clientSecret,
      refresh_token: token.refreshToken,
      scope: token.scope,
      grant_type: 'refresh_token'
    };
    var post_body = queryString.stringify(body);    
  
    return this.http.post<TokenEndPointResponse>(environment.auth.tokenUri, post_body,httpOptions)
    .pipe(
      tap((tokens) => {
        this.setTokenInfo(tokens);
      })
    );
  }

  getAccessTokenFromResponse(token: { code: string }) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };    

    const body: TokenEndPointRequest = {
      client_id: environment.auth.clientId,
      client_secret: environment.auth.clientSecret,
      grant_type: 'authorization_code',
      code: token.code,
      redirect_uri: environment.auth.redirectUri
    };
    sessionStorage.removeItem('code_verifier');
    console.log(body.redirect_uri)

    // https://sagatto.com/20200128_query-string_vuejs
    //   npm install query-string
    //   npm install @types/query-string
    var post_body = queryString.stringify(body);    
    console.log(post_body)

    return new Promise<void>( (resolve, reject) => {
      this.http.post<TokenEndPointResponse>(environment.auth.tokenUri, post_body, httpOptions ).subscribe( data => {
        // アクセストークン保存
        this.setTokenInfo(data);
        resolve();
      });
    });
  }


}
