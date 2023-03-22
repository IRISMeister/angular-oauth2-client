import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  // 認可コード
  private code: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private tokenService: TokenService) { }

  //ngOnInit(): void {
  async ngOnInit() {

    // 認可コード,state取得
    let error;
    let callbackState;
    this.route.queryParamMap.subscribe( param => {
      this.code = param.get('code');
      callbackState = param.get('state');
      error = param.get('error');
    });

    // Login Canceled
    if (error) this.router.navigate(['/home']);

    // state検証
    const issuedState = sessionStorage.getItem('state');
    sessionStorage.removeItem('state');
    if (callbackState !== issuedState) {
      alert('state検証に失敗しました '+callbackState+" "+issuedState);
      await this.router.navigate(['/home']);
      return;
    }

    this.tokenService.setIsAuthorized("1")

    // アクセストークン取得
    await this.tokenService.getAccessTokenFromResponse(
      {
        code: this.code
      }      
    );

    // リソース表示コンポーネントに遷移
    await this.router.navigate(['/info']);
  }

}
