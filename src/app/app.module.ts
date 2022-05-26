import { MenuPrincipalComponent } from './../app/components/menu-principal/menu-principal.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  OAuthModule  }  from  'angular-oauth2-oidc' ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RegistroComponent } from './pages/Auth/registro/registro.component';
import { ValidarComponent } from './pages/Auth/validar/validar.component';
import { PrincipalComponent } from './pages/Usuario/principal/principal.component';
import { MenuEntradaComponent } from './components/menu-entrada/menu-entrada.component';
import { HistorialComponent } from './pages/Usuario/historial/historial.component';
import { EnCursoComponent } from './pages/Usuario/en-curso/en-curso.component';
import { UsuarioComponent } from './pages/Usuario/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ValidarComponent,
    PrincipalComponent,
    MenuEntradaComponent,
    HistorialComponent,
    EnCursoComponent,
    UsuarioComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule . forRoot ( ) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
