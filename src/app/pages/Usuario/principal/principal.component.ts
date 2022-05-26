import { ConsumirService } from './../../../services/consumir.service';
import { RedpackService } from './../../../services/redpack.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  enviar: FormGroup;
  token: FormGroup;
  access: string = null;
  usuario: any = {};
  cajAbierta: any[]=[];
  cajCerrada: any[]=[]; 
  cotizacion: any[] = [];

  constructor(private fb: FormBuilder,
    private acceso:RedpackService,
    private consumir: ConsumirService) {
    this.envio();
   }

  ngOnInit(): void {
    this.token = this.fb.group({
      username: ['PAKEVA2021'],
      password: ['PJ57#$31D'],
      client_id:['app-redpack-web'],
      client_secret:['R3dPack&2020']
    });
    // console.log("los datos-----",this.token.value);
    this.acceso.token(this.token.value).then(resp=> {
      // if(resp){
      //   return console.log("Navegar al home");
      // }
    });

    this.consumir.retrieveToken();
    
  }

  envio(){
    this.enviar = this.fb.group({
        largo: ['',Validators.required],
        ancho:['', Validators.required],
        alto:['', Validators.required],
        peso:['', Validators.required],
        origin:['', Validators.required],
        destination:['', Validators.required],
        cotizar: this.fb.group({
          largo: [''],
          ancho:[''],
          alto:[''],
          peso:[''],
          origin:[''],
          destination:[''],          
        }),
        cajaAbierta:[''],
        cajaCerrada:[''],
      });
  }
  get largoInvalido(){
    return this.enviar.get('largo').invalid && this.enviar.get('largo').touched;
  }
  get anchoInvalido(){
    return this.enviar.get('ancho').invalid && this.enviar.get('ancho').touched;
  }
  get altoInvalido(){
    return this.enviar.get('alto').invalid && this.enviar.get('alto').touched;
  }
  get pesoInvalido(){
    return this.enviar.get('peso').invalid && this.enviar.get('peso').touched;
  }
  get cpOrigenInvalido(){
    return this.enviar.get('origin').invalid && this.enviar.get('origin').touched;
  }
  get cpDestinoInvalido(){
    return this.enviar.get('destination').invalid && this.enviar.get('destination').touched;
  }

  async ngAfterViewInit() {
    this.usuario = await localStorage.getItem('usuario');
    // console.log("el local Storage-------",this.usuario);

  }

  
  cotiza(){

    console.log(this.enviar.value);    
    if (this.enviar.invalid){
      return Object.values(this.enviar.controls).forEach(value => {
        value.markAsTouched();
      });
    }
    
  }

  cajaAbierta(event: any) {
    console.log("Agregar caja Abierta");
      const file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
  }
  cajaCerrada(event: any) {
    console.log("Agregar Caja Cerrada");
      const file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
  }

  cotizar(){
    this.enviar.value
		this.cotizacion.push(this.enviar.value);
		console.log(this.cotizacion);
		this.enviar.reset();
  }

  
  

}
