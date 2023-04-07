import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { getversion,getauthurl,logout } from '../models/BFF'

@Injectable({
  providedIn: 'root'
})
export class BffService {
  constructor(private http: HttpClient) {}

  getversion() {
    const headers = { 'ContentType': 'application/json' };
    return this.http.get<getversion>(environment.bff.BFFServer+'/getversion')
  }

  getauthurl(body:any) {
    const headers = { 'ContentType': 'application/json' };
    return this.http.post<getauthurl>(environment.bff.BFFServer+'/getauthurl',body,{ headers })
  }

  isauth() {
    const headers = { 'ContentType': 'application/json' };
    return this.http.get<any>(environment.bff.BFFServer+'/isauth',{ headers })
  }  

  getserverinfo() {
    const headers = { 'ContentType': 'application/json' }
    return this.http.get<any>(environment.bff.BFFServer+'/getserverinfo',{ headers })
  }

  userinfo() {
    const headers = { 'ContentType': 'application/json' };
    return this.http.get<any>(environment.bff.BFFServer+'/userinfo',{ headers })
  }

  call(body:any) {
    const headers = { 'ContentType': 'application/json' }
    return this.http.post<any>(environment.bff.BFFServer+'/call', body,{ headers })
  }

  refresh() {
    const headers = { 'ContentType': 'application/json' }
    return this.http.get<any>(environment.bff.BFFServer+'/refresh',{ headers })
  }

  logout(body:any) {
    const headers = { 'ContentType': 'application/json' }
    return this.http.post<logout>(environment.bff.BFFServer+'/logout', body, { headers })    
  }

  revoke() {
    const headers = { 'ContentType': 'application/json' }
    return this.http.get<any>(environment.bff.BFFServer+'/revocation', { headers })
  }
}
