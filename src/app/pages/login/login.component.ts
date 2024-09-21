import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


routes=inject(Router);

userFrom: FormGroup =new FormGroup({
userName: new FormControl(''),
password: new FormControl('')

});
onLogin(){
  debugger
  const formValue= this.userFrom.value;
  if(formValue.userName=="admin" && formValue.password=="112233"){
this.routes.navigateByUrl("dashboard");
  }else{
    alert("Wrong cedint");
  }
}
}
