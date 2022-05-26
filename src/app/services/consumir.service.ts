import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export class Foo {
  constructor(public id: number, public name: string) { }
} 


@Injectable({
  providedIn: 'root'
})
export class ConsumirService{
  public clientId = 'app-redpack-web';
  public redirectUri = 'http://localhost:4200/';
  // Cookie: string = null;

  constructor(private _http: HttpClient) { }

  

  retrieveToken() {
    let params = new URLSearchParams();   
    params.append('username', 'PAKEVA2021');    
    params.append('password', 'PJ57#$31D');
    params.append('type','request-body');
    params.append('client_id', 'app-redpack-web');
    params.append('client_secret','R3dPack&2020');
    params.append('redirect_uri', this.redirectUri);


    console.log("los aparams --------",params.toString());
    let headers = 
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'});       
      this._http.post('https://api.redpack.com.mx/oauth/token',
        {data: params.toString()}, { headers: headers })
        .subscribe(
          data => this.saveToken(data),
          err => alert('Acept Credentials')
          ); 
  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = 'http://localhost:4200';
  }
  checkCredentials() {
    return localStorage.check('access_token');
  } 

}