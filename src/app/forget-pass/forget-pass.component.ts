import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
  forgetPassword!:FormGroup;

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router, private snackBar:MatSnackBar) { }


  ngOnInit(): void {
    this.forgetPassword = this.formBuilder.group({
      email:new FormControl('', [Validators.required, Validators.email])
    })
  }
  forgetpass(){
    this.http.put(environment.apiBaseUrl+"/forgetpassword",this.forgetPassword.value).subscribe((res:any)=>{
      console.log(res.message);
      
      if((res.status==400)||(res.status==false)){
        this.snackBar.open("User with this email does not exist....!","",{
          duration:3000,
          verticalPosition:"top"
        })
        this.forgetPassword.reset();

      }else{
        this.snackBar.open("ResetLink has sent on email..","",{
          duration:3000,
          verticalPosition:"top"
        })
        localStorage.setItem('reset_token', res.message);
        console.log("setItem...........",localStorage.getItem('reset_token'));
        this.forgetPassword.reset();
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
