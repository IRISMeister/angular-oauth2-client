//import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BffService } from '../service/bff.service';

@Component({
  selector: 'app-display-info-bff',
  templateUrl: './display-info-bff.component.html',
  styleUrls: ['./display-info-bff.component.css']
})
export class DisplayInfoBffComponent {

  public isAuthorized: number=0
  public BFFNameSpace: string=''
  public BFFUserName: string=''
  public BFFUserRoles: string=''
  public BFFSessionID: string=''
  public BFFCSPSessionID: string=''
  public BFFCounter: number=0
  public BFFAT: string=''
  public BFFIDT: string=''

  public BFFsub: string=''
  public BFFname: string=''
  public BFFpreferred_username: string=''
  public BFFupdated_at: string=''

  public HostName: string=''
  public UserName: string=''
  public sub: string=''
  public Status: string=''
  public TimeStamp: string=''
  public aud: string=''
  public exp: string=''

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bffService: BffService) {
  }
  async ngOnInit() {

    this.bffService.getserverinfo()
    .subscribe({
      next: (resp) => {
        this.isAuthorized=resp.ServerInfo.isAuthorized
        this.BFFNameSpace=resp.ServerInfo.NameSpace
        this.BFFUserName=resp.ServerInfo.UserName
        this.BFFUserRoles=resp.ServerInfo.Roles
        this.BFFSessionID= resp.ServerInfo.SessionID
        this.BFFCSPSessionID= resp.ServerInfo.CSPSessionID
        this.BFFCounter= resp.ServerInfo.Counter
        this.BFFAT= resp.ServerInfo.AT
        this.BFFIDT= resp.ServerInfo.IDT
      },
      error: (e) => console.error(e)
    })

    this.bffService.userinfo()
    .subscribe({
      next: (resp) => {
        this.BFFsub=resp.Userinfo.sub
        this.BFFname=resp.Userinfo.name
        this.BFFpreferred_username=resp.Userinfo.preferred_username
        this.BFFupdated_at=resp.Userinfo.updated_at
      },
      error: (e) => console.error(e)
    })    

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
    const body = { endpoint: endpoint };

    this.bffService.call(body)
    .subscribe({
      next: (resp) => {
        this.HostName = resp.HostName
        this.UserName = resp.UserName
        this.sub = resp.sub
        this.Status = resp.Status
        this.TimeStamp = resp.TimeStamp
        this.aud = resp.aud
        this.exp = resp.exp
      },
        error: (e) => {
          console.error(e)
          alert(e.message)
      }
    })
  }

  public RefreshToken() {
    this.bffService.refresh()
    .subscribe({
      next: (resp) => {
        this.ngOnInit() // redraw screen  
      },
      error: (e) => {
        console.error(e) 
        alert(e.message)
      }
    })
  }

  public Logout() {

    //ログアウト後のRedirect先を指定
    let url=environment.auth.post_logout_redirect_uri
    const body = { postLogoutRedirectURI: url };    

    this.bffService.logout(body)
    .subscribe({
      next: (resp) => {
        // BFFとOPの間でログイン済み
        if (resp.IsAuthorized===1) {
          window.location.href = resp.logoutURL
          console.log(resp.logoutURL)
        }
      },
      error: (e) => {
        console.error(e) 
        alert(e.message)
        this.router.navigate(['/logout-bff'])     
      }
    })
  }

  public Revoke() {
    this.bffService.revoke()
    .subscribe({
      next: (resp) => {
      //Nothing to do
      },
      error: (e) => console.error(e)
    })
  }
}
