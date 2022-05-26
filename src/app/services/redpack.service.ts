import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';

const url = environment.redPack;

@Injectable({
  providedIn: 'root'
})


export class RedpackService {
  // /oauth/token

  constructor(private http: HttpClient,
    private router: Router) { }

    async token(datos: string){

    }

    
}
