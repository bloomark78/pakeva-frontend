import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from 'src/app/models/auth.model';
import { RegistroModel } from 'src/app/models/registro.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registro: FormGroup;
  auth: FormGroup;
  usuario: AuthModel= new AuthModel;
  register: RegistroModel=new RegistroModel;

  constructor(private fb: FormBuilder, private acceso:AuthService) {
    this.Registro();
   }

  ngOnInit(): void {
  }

  Registro(){
    this.registro =this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,3}$')]],
        password: ['', Validators.required],
        name:['', Validators.required],
        A_P:['', Validators.required],
        A_M:['', Validators.required],
        cellphone:['',[Validators.required, Validators.maxLength(10),Validators.pattern(/^[1-9]\d{6,10}$/)]],
        gender:['', Validators.required],
        role:[""],
    });
  }
  get emailInvalido(){
    return this.registro.get('email').invalid && this.registro.get('email').touched;
  }
  get passwordInvalido(){
    return this.registro.get('password').invalid && this.registro.get('password').touched;
  }
  get nameInvalido(){
    return this.registro.get('name').invalid && this.registro.get('name').touched;
  }
  get A_PInvalido(){
    return this.registro.get('A_P').invalid && this.registro.get('A_P').touched;
  }
  get A_MInvalido(){
    return this.registro.get('A_M').invalid && this.registro.get('A_M').touched;
  }
  get celphoneInvalido(){
    return this.registro.get('cellphone').invalid && this.registro.get('cellphone').touched;
  }
  get genderInvalido(){
    return this.registro.get('gender').invalid && this.registro.get('gender').touched;
  }

  registrar(){
    this.registro.value.role="Usuario";
    console.log(this.registro.value);    
    if (this.registro.invalid){
      return Object.values(this.registro.controls).forEach(value => {
        value.markAsTouched();
      });
    }
    this.acceso.register(this.registro.value).then(resp=> {
      if(resp){
        return console.log("Navegar al home");
      }
    });
  }


}
