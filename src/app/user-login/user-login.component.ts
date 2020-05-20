import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../user-registration/user-registration.component';
import { UserServiceService } from './../user-service.service';
import { TokenStorage } from './../core/token.storage';
import { Router } from '@angular/router';

export interface LogInCredentials{
  emailId: string;
  password: string;
}
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, public dialog:MatDialog, 
    private userService:UserServiceService, private token: TokenStorage,
    private router: Router) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      emailId: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  emailId: string;
  password: string;
  loginCred: LogInCredentials;
  formGroup: FormGroup;

  onSubmit(){
    if(this.formGroup.valid){
      this.loginCred = {emailId:this.emailId, password:this.password};
      console.log(this.loginCred)

      this.userService.authenticateUser(this.loginCred).subscribe(
        data => {
          this.token.saveTokenUser(data['token'], data['emailId'], data['firstName']);
          console.log(data);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log(error); this.openDialog(error);
          this.router.navigate(['/login']);
        }
      )
    }else{
      this.openDialog("Plese enter valid credentials");
    }
  }

  openDialog(message:string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {message: message}
    });

  }
}
