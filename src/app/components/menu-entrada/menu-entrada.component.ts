import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-entrada',
  templateUrl: './menu-entrada.component.html',
  styleUrls: ['./menu-entrada.component.css']
})
export class MenuEntradaComponent implements OnInit {

  usuario: any = {};
  rol: string = null;
  pin: string = null;
  token: string = null;

  constructor(private acceso:AuthService) {
    console.log("Entrando al menu de administracion");
    
   }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    this.token = await localStorage.getItem('token');
    // console.log("el local Storage-------",this.token);

  }

  
  salir(){
    this.acceso.logout();
  }

}
