import { Component, OnInit } from '@angular/core'
import {environment} from '../../environments/environment'
import * as CryptoJS from 'crypto-js'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';
import { getauthurl,getversion } from '../models/BFF'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public iam:boolean=false
  public version: string=''

  constructor(private http: HttpClient, private router: Router) {
  }

  public async connect() {

    // stateの発行
    const state = this.randomStr(40)
    // pkce対応
    const code_verifier = this.randomStr(43)
    sessionStorage.setItem('state', state)
    sessionStorage.setItem('code_verifier', code_verifier)

    const codeVerifierHash = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64)
	  const code_challenge = codeVerifierHash
		 .replace(/=/g, '')
		 .replace(/\+/g, '-')
		 .replace(/\//g, '_')    

    const params = new Map()
    params.set('response_type', 'code')
    params.set('client_id', environment.auth.clientId)
    params.set('state', state)
    params.set('scope', environment.auth.scope)
    params.set('redirect_uri', environment.auth.redirectUri.replace('#', '%23'))    // dirty hack
    params.set('code_challenge', code_challenge)
    params.set('code_challenge_method', 'S256')

    let authUrl = `${environment.auth.authUri}?`
    params.forEach((value: string, key: string) => {
      authUrl += `${key}=${value}&`
    })

    // 認可エンドポイントにリクエスト
    window.location.href = authUrl
  }

  public async connectBFF() {
    const headers = { 'ContentType': 'application/json' };
    //ログイン後のRedirect先を指定
    let url=environment.bff.redirectUri
    
    const body = { redirectURI: url };    
    this.http.post<getauthurl>(environment.bff.BFFServer+'/getauthurl',body,{ headers })
    .pipe( 
      tap((resp) => {
      })
    ).subscribe((resp) => {
      // 既にBFFとOPの間でログイン済み
      if (resp.IsAuthorized===1) {
        this.router.navigate(['/info-bff']);
      }
      else {
        window.location.href = resp.authURL
      }
    })
  }

  public async connectBFFTest() {
    let ver =''

    this.http.get<getversion>(environment.bff.BFFServer+'/getversion')
    .pipe( 
      tap((resp) => {
      })
    ).subscribe((resp) => {
      ver = resp.version
      console.log(ver)
    })
  }

  public async connectIAM() {
    window.location.href = environment.iam.resourceServerUri
  }

  ngOnInit(): void {
    // 8443: kong https port
    if (window.location.port=='8443') {
      this.iam=true
    }
  }

  private randomStr(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
             
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
             
    return result
  }

}
