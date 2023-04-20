import { Component, OnInit } from '@angular/core'
import {environment} from '../../environments/environment'
import * as CryptoJS from 'crypto-js'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { BffService } from '../service/bff.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public canUseSPA:boolean=false
  public OP:string=''
  public iam:boolean=false
  public ver:boolean=false
  public version: string=''

  constructor(private http: HttpClient, private router: Router, private bffService: BffService ) {
  }

  ngOnInit(): void {
    // 8443: kong https port
    if (window.location.port=='8443') {
      this.iam=true
    }
    this.OP=environment.auth.OP
    if (this.OP==='iris') { 
      this.canUseSPA=true
    }
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

  public connectBFF() {
    //ログイン後のRedirect先を指定
    const body = { redirectURI: environment.bff.redirectUri };    

    this.bffService.getauthurl(body)
    .subscribe((resp) => {
      // 既にBFFとOPの間でログイン済み
      if (resp.IsAuthorized===1) {
        this.router.navigate(['/info-bff']);
      }
      else {
        window.location.href = resp.authURL
      }
    })
  }

  public connectBFFTest() {
    this.bffService.getversion()
    .subscribe((resp) => {
      this.version = resp.version
      this.ver = true
    })
  }

  public async connectIAM() {
    window.location.href = environment.iam.resourceServerUri
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
