
import { ValidarComponent } from './pages/Auth/validar/validar.component';
import { RegistroComponent } from './pages/Auth/registro/registro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { PrincipalComponent } from './pages/Usuario/principal/principal.component';
import { HistorialComponent } from './pages/Usuario/historial/historial.component';
import { EnCursoComponent } from './pages/Usuario/en-curso/en-curso.component';


const routes: Routes = [
  {path: 'menuPrincipal'    , component: MenuPrincipalComponent },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'validar', component: ValidarComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'historial', component: HistorialComponent},
  {path: 'enCurso', component: EnCursoComponent},
  {path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
