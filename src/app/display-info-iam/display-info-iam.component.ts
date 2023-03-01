import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpParams,HttpParamsOptions,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { InfoResponse } from '../models/ResourceServer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-display-info-iam',
  templateUrl: './display-info-iam.component.html',
  styleUrls: ['./display-info-iam.component.css']
})
export class DisplayInfoIamComponent implements OnInit {

  // 認可コード
  private code: string;
  private state: string;
  public version: string;

  public body: string='';
  public HostName: string='';
  public UserName: string='';
  public sub: string='';
  public Status: string='';
  public TimeStamp: string='';
  public aud: string='';

  constructor(private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit() {
      // 認可コード,state取得
      let callbackState;
      this.route.queryParamMap.subscribe( param => {
      this.code = param.get('code');
      this.state = param.get('state');
      console.log(this.code);
      console.log(this.state);
    });

    this.accessResourceServer();
  }

    /**
     * Resource Server #1にアクセスしセッションを作成する。そのために初回だけcode,stateを付与する必要がある。
     * 以降は、KONGが発行するcookie:session(httpOnly)を通じて、クライアント-KONG間のセッションが維持される。
     */    
     accessResourceServer() {
/*
      const headers = new HttpHeaders(
        { 'Access-Control-Allow-Origin': '*' ,
         'Access-Control-Allow-Methods': 'GET,POST,HEAD,OPTIONS'
        }
      );
*/      
    const hash = {
      code: this.code,
      state: this.state
    };

    const paramsOptions = <HttpParamsOptions>{fromObject: hash};
    const params = new HttpParams(paramsOptions);

    // GET /MYAPP/public?code=xxx&state=yyy
    this.http.get(environment.iam.resourceServerInfo, { params: params,responseType: 'text',observe: 'response' })
    .pipe( 
      tap((resp) => {
        this.version = resp.body;
      })
    ).subscribe();

  }

  /**
   * Resource Server #1にアクセスし、リソース(json)を取得
   */
  public AccessRsc1() {
    this.http.get<InfoResponse>(environment.iam.resourceServerUri)
    .pipe( 
      tap((resp) => {
      })
    ).subscribe((resp) => {
      this.HostName = resp.HostName;
      this.UserName = resp.UserName;
      this.Status = resp.Status;
      this.TimeStamp = resp.TimeStamp;
      this.aud = resp.aud;
    });
  }

  /**
   * Resource Server #2にアクセスし、リソース(json)を取得
   */
  public AccessRsc2() {
    this.http.get<InfoResponse>(environment.iam.resourceServer2Uri)
    .pipe( 
      tap((resp) => {
      })
      ).subscribe((resp) => {
        this.HostName = resp.HostName;
        this.UserName = resp.UserName;
        this.sub = resp.sub;
        this.Status = resp.Status;
        this.TimeStamp = resp.TimeStamp;
        this.aud = resp.aud;
      });
  }  
}
