import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css']
})
export class ValidarComponent implements OnInit {

  validar: FormGroup;
  pin: string = null;
  access: string = null;

  constructor(private fb: FormBuilder, private acceso:AuthService) { 
    this.validacion();
  }

  ngOnInit(): void {
  }

    validacion(){
      this.validar = this.fb.group({
          pin: ['',Validators.required],
          email:[''],
        });

    }
  get accesoInvalido(){
    return this.validar.get('pin').invalid && this.validar.get('pin').touched;
  }

  async ngAfterViewInit() {
    this.pin = await localStorage.getItem('pin');
    this.access = await localStorage.getItem('email');
    // console.log("el local Storage-------",this.acceso, this.pin);
    if(this.pin == null || this.pin == undefined || this.acceso == null || this.acceso == undefined){
      return console.log("No se puede verificar la cuenta");
    }

  }

  valida(){
    console.log("el pin----------", this.validar.value.pin, this.access);
    console.log("Envirar la validacion");
    console.log("Pin localstorage ----- ",this.pin, typeof(this.pin));
    console.log("Pin input ------ ",this.validar.value.pin, typeof(this.validar.value.pin));
    if(this.validar.value.pin === this.pin){
      console.log("Los pines son iguales");
      console.log(this.validar.value);
      console.log(this.acceso); 
      this.validar.value.email=this.access     
     this.acceso.verificar(this.validar.value);
    }
    console.log("Pin invalido")
  }
  reenviar(){
    this.acceso.resendPin(this.access);
  }

}
