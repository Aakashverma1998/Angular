import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  autoLogout: any;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }
  login(){
    this.http.post(environment.apiBaseUrl+"/login",this.loginForm.value).subscribe((res:any)=>{
      
      if((res.status==400)||(res.status==false)){
        this.snackBar.open("check your email/password..!","",{
          duration:3000,
          verticalPosition:"top"
        })
        this.router.navigate(['login'])
        this.loginForm.reset();

      }else{
        this.snackBar.open("User Login Success..","",{
          duration:3000,
          verticalPosition:"top"
        })

        localStorage.setItem('token', res.token);
           console.log("localstroge,,,,.......................", localStorage.getItem('token'));
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }
    },err=>{
      console.log(err);
      this.snackBar.open("Something went worng..","",{
        duration:3000,
        verticalPosition:"top"
      })
    })
  }

}
