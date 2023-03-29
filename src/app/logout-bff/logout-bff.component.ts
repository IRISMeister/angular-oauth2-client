import { Component } from '@angular/core';
import { HttpClient,HttpParams,HttpParamsOptions,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-logout-bff',
  templateUrl: './logout-bff.component.html',
  styleUrls: ['./logout-bff.component.css']
})
export class LogoutBffComponent {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("logout-bff called.")

    // front channel logoutで呼ばれた際に、sessionIDを取り除きたいが、httponlyなのでユーザエージェント側では不可能。
    // 下記のBFFエンドポイントで削除する。
    const headers = { 'ContentType': 'application/json' }
    this.http.get<any>(environment.bff.BFFServer+'/revocation', { headers })
    .subscribe({
      next: (resp) => {
        //Nothing to do
      },
      error: (e) => console.error(e)
    })

  }

}
