import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../service/token.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-callback-bff',
  templateUrl: './callback-bff.component.html',
  styleUrls: ['./callback-bff.component.css']
})
export class CallbackBffComponent {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private tokenService: TokenService) { }

  //ngOnInit(): void {
  async ngOnInit() {

    // （キャンセルを押されたかもしれないので）実際にログインされたかを問い合わせ。
    const headers = { 'ContentType': 'application/json' };

    this.http.get<any>(environment.bff.BFFServer+'/isauth',{ headers })
    .subscribe((resp) => {
      if (resp.IsAuthorized===0) {
        this.router.navigate(['/home']);
      }      
    });

    // state検証やPKCE(code_verifier)のチェックはBFFであるIRIS側で行われている。
    // この時点(GetAuthorizationCodeEndpointで帰った認証用のURLに移動した後からの一連のログイン操作後)でIRIS側でのAT,IDT,RT取得は完了し、%SYSのテーブル OAuth2.AccessTokenに保存されている。
    // StateがUnique Indexになっているので、State値を、そのままSPA-BFF間のセッション識別のIDとして採用しようと思ったが
    // State値はAT取得時にクリアしているようで、以降のセッションの特定に使用できない。
    // (SessionId, ApplicationName)もUnique Indexになっているので、SessionIDをキーとして採用する。
    //
    // 以下、%SYS.OAuth2.Authorization.GetAuthorizationCodeEndpoint()のドキュメントより
    // The redirectURL argument is the URL of the CSP page which should be invoked after the request
    // for the access token is completed and the access token is stored indexed by the ApplicationName and SessionId.
    //
    // ひとまずcspのsessionIdは使わず(UseSession使わない)、独自のsessionidをBFF側で生成し、httponly,samesite=strickで返す。
 
    // リソース表示コンポーネントに遷移
    await this.router.navigate(['/info-bff']);
  }
}
