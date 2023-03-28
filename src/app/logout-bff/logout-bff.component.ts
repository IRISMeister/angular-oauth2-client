import { Component } from '@angular/core';

@Component({
  selector: 'app-logout-bff',
  templateUrl: './logout-bff.component.html',
  styleUrls: ['./logout-bff.component.css']
})
export class LogoutBffComponent {

  ngOnInit(): void {
    // sessionIDを取り除きたいがユーザエージェント側では不可能.
    console.log("logout-bff called. Nothing to do")
  }

}
