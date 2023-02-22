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
    let callbackState;
    this.route.queryParamMap.subscribe( param => {
      this.code = param.get('code');
      callbackState = param.get('state');
    });

    // state検証
    const issuedState = sessionStorage.getItem('state');
    sessionStorage.removeItem('state');
    if (callbackState !== issuedState) {
      alert('state検証に失敗しました');
      await this.router.navigate(['/home']);
      return;
    }

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
