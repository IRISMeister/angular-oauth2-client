import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenService } from '../service/token.service'
import { environment } from '../../environments/environment'
import { InfoResponse } from '../models/ResourceServer'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-display-info',
  templateUrl: './display-info.component.html',
  styleUrls: ['./display-info.component.css']
})
export class DisplayInfoComponent implements OnInit {

  public IsAuthorized: boolean=false
  public accessToken: string //表示のためにpublicにしているがprivateのほうが安全
  public IdToken: string     //表示のためにpublicにしているがprivateのほうが安全
  private refreshToken: string
  private scope: string
  
  public HostName: string=''
  public UserName: string=''
  public sub: string=''
  public Status: string=''
  public TimeStamp: string=''
  public aud: string=''
  public exp: string=''

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
    // 保存されたアクセストークンの取得
    this.accessToken=this.tokenService.getAccessToken()
    this.refreshToken=this.tokenService.getRefreshToken()
    this.IdToken=this.tokenService.getIdToken()
    this.scope=this.tokenService.getScope()
  }

  ngOnInit(): void {
    let isauth=this.tokenService.getIsAuthorized()
    if (isauth==="1") this.IsAuthorized=true
    else this.IsAuthorized=false
  }

  /**
   * Resource Server #1にアクセスし、リソース(json)を取得
   */
  public AccessRsc1() {
    const headers = new HttpHeaders(
      { Authorization: 'Bearer ' + this.accessToken }
    )

    this.http.get<InfoResponse>(environment.rsc.resourceServerUri,{headers})
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
    })
  }

  /**
   * Resource Server #2にアクセスし、リソース(json)を取得
   */
  public AccessRsc2() {
    const headers = new HttpHeaders(
      { Authorization: 'Bearer ' + this.accessToken }
    )

    this.http.get<InfoResponse>(environment.rsc.resourceServer2Uri,{headers})
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
      })
  }  

  public RefreshToken() {
    
    this.tokenService.refreshToken(
      {
        refreshToken: this.refreshToken,
        scope: this.scope
      }
    ).subscribe( tokens => {
        this.accessToken=tokens.access_token
        this.IdToken=tokens.id_token
        this.refreshToken=tokens.refresh_token
      },
      (err) => console.log('Received an error: ' + err),
      () => console.log('refresh done')
    )
  }

  public Logout() {
    
    this.tokenService.Logout(
      {
        IdTokenHint: this.IdToken
      }
    )
  }

}
