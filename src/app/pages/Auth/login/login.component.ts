import { AuthService } from '../../../services/auth.service';
import { AuthModel } from '../../../models/auth.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  usuario: AuthModel= new AuthModel;

  constructor(private fb: FormBuilder, private acceso:AuthService) { 
    this.Login();
  }

  ngOnInit(): void {
  }

    Login(){

      this.login = this.fb.group({
          email: [this.usuario.email, [Validators.required, Validators.minLength(8)]],
          password: [this.usuario.password, Validators.required],
        });

    }
  get accesoInvalido(){
    return this.login.get('email').invalid && this.login.get('email').touched;
  }
  get passwordInvalido(){
    return this.login.get('password').invalid && this.login.get('password').touched;
  }

  logeo(){
    console.log(this.login.invalid)
    if (this.login.invalid){
      return Object.values(this.login.controls).forEach(value => {
        value.markAsTouched();
      });
    }
    console.log(this.login.value);
    this.acceso.login(this.login.value).then(resp=> {
      if(resp){
        return console.log("Navegar al home");
      }
    });
  }

}
