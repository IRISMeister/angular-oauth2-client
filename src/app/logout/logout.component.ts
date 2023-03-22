import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from '../service/token.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.removeTokens()
  }

}
