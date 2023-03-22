import { Component } from '@angular/core';
import { HttpClient,HttpParams,HttpParamsOptions,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { InfoResponse } from '../models/ResourceServer';
import { tap } from 'rxjs/operators'
import { getlourl } from '../models/BFF'

@Component({
  selector: 'app-display-info-bff',
  templateUrl: './display-info-bff.component.html',
  styleUrls: ['./display-info-bff.component.css']
})
export class DisplayInfoBffComponent {

  public HostName: string=''
  public UserName: string=''
  public sub: string=''
  public Status: string=''
  public TimeStamp: string=''
  public aud: string=''
  public exp: string=''

  constructor(private http: HttpClient) {
  }

  /*
   * 指定したURLにアクセスし、リソース(json)を取得するようBFFに依頼。
   */
    public CallResourceServer(param:number) {

    let endpoint=''
    if (param===1) {
      endpoint=environment.rsc.resourceServerUri
    }
    else if (param===2) {
      endpoint=environment.rsc.resourceServer2Uri
    }
    const headers = { 'ContentType': 'application/json' };
    const body = { endpoint: endpoint };

    this.http.post<InfoResponse>(environment.bff.BFFServer+'/call', body,{ headers })
    .pipe( 
      tap((resp) => {
      })
    ).subscribe((resp) => {
      this.HostName = resp.HostName
      this.UserName = resp.UserName
      this.sub = resp.sub
      this.Status = resp.Status
      this.TimeStamp = resp.TimeStamp
      this.aud = resp.aud
      this.exp = resp.exp
    });
  }

  public async Logout() {

    const headers = { 'ContentType': 'application/json' };
    //ログアウト後のRedirect先を指定
    let url=environment.auth.post_logout_redirect_uri
    const body = { postLogoutRedirectURI: url };    

    this.http.post<getlourl>(environment.bff.BFFServer+'/getlourl', body, { headers })
    .pipe( 
      tap((resp) => {
      })
    ).subscribe((resp) => {
      // BFFとOPの間でログイン済み
      if (resp.IsAuthorized===1) {
        window.location.href = resp.logoutURL
        console.log(resp.logoutURL)
      }
      else {
        console.log('nothing to do')
      }
    })
  }


  public RefreshToken() {
  }

}
