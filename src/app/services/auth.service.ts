import { AuthModel } from './../models/auth.model';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistroModel } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  private urls = environment.api+'/auth';
  token: string = null;
  pinValido: string= null;
  usuario = {};

  constructor(private http: HttpClient,
    private router: Router,) { }
  //Guarda el token 
  async guardarToken(token: string){
      this.token = token;
      await localStorage.setItem('token', token);
      await this.validaToken();
  }
  //Carga el token
  async cargarToken(){
    this.token = await localStorage.getItem('token') || null;
  }
  //Valida el token
  async validaToken(): Promise<boolean>{
      await this.cargarToken();  
      const token = {headers: {'Token-P4k3v4': localStorage.getItem('token')}};
  
      if(!this.token){
        //this.navCtrl.navigateRoot('/login', {animated: true});
        return Promise.resolve(false);
      }  
        return new Promise<boolean>(resolve => {
        this.http.get(this.urls+'/verificaToken',token).subscribe(async (resp:any) => {
          if(resp.status){
            this.usuario = await resp.usuario;
            localStorage.setItem('usuario', JSON.stringify(this.usuario));
            resolve(true);
          }
          else{
          //  this.router.navigateByUrl('/login',{animated: true});
            resolve(false);
          }
        });
      });
  
  }
  //Aqui va el login
  login(data: string){
      return new Promise( resolve => {
        this.http.post(this.urls+'/login',data).subscribe( async (resp:any) => {
          console.log("la resp-------",resp);
          if(resp.status){
            await this.guardarToken(resp.token);
            await this.router.navigateByUrl('principal');
            resolve(true);
          }
          if(!resp.verificado){
            Swal.fire({
              title: 'Inicio de sesión',
              text: resp.msg,
              icon: 'warning',
              confirmButtonText: 'verificar'
            }).then((result) => {
              if(result.isConfirmed){
                return console.log("Navegar a verificacion de cuenta");
              }
              else if(result.isDenied){
                return console.log("No hacer nada ahorita");
              }
            });
            resolve(false);
          }
          if(!resp.status){
            // Swal.fire({
            //   title: 'Error',
            //   text: resp.errors[0].msg || resp.msg,
            //   icon: 'error',
            //   confirmButtonText: 'ACEPTAR'
            // });
            resolve(false);
          }
  
        }, (err) => {
          console.log(err);
          resolve(false);
        });
      });
  }
  //Registra a usuarios
  async register(data: any){
      return this.http.post(this.urls+'/registro',data).subscribe(async (resp:any) => {
        console.log(resp);
        console.log(resp.email);
        if(resp.status){
          //Guardar el pin en el localstorage para validarlo
          await localStorage.setItem('pin',await resp.pin);
          await localStorage.setItem('email',await resp.email);
          //Redireccionar a la pagina de verificacion de cuenta
          return this.router.navigateByUrl('/validar');
        }
        return console.log("Errror --------- ",resp.msg);
      },
      (err)=>{
        console.log(err);
      });
  }
  resendPin(acceso: string){
      return this.http.post(this.urls+'/resendPin',acceso).subscribe(async (data:any) => {
        console.log(data);
        if(data.status){
          await localStorage.setItem('pin',data.pin);
        }
      });
  }
  //Verificar si el pin coincide
  async verificar(acceso: string){
      return new Promise( resolve => {
        this.http.post(this.urls+'/verificar',acceso).subscribe(async (resp:any) => {
          console.log(resp);
          return this.router.navigateByUrl('/principal');
        }, (err) => {
          console.log(err.error.msg);
          resolve(false);
        });
      });
   // });
  }

  //cerrar Sesion
  logout(){
    this.token = null;
    this.usuario = null;
    localStorage.clear();
    return this.router.navigateByUrl('/home');
  }
  

    
}
