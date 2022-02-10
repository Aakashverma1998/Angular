import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  resetPassword!:FormGroup;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router, private snackBar:MatSnackBar) { }

  

  ngOnInit(): void {
    this.resetPassword = this.formBuilder.group({
      password:new FormControl('', [Validators.required,Validators.minLength(8) ]),
      confirmPassword:new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }
  resetpass(){
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `${localStorage.getItem('reset_token')}`
    })
    this.http.put(environment.apiBaseUrl+"/resetpassword",this.resetPassword.value, {headers:httpHeaders}).subscribe((res:any)=>{
      console.log(res);
      if(res.status == 400){
        this.snackBar.open(`Alert:${res.message}`,"",{
          duration:3000,
          verticalPosition:"top"
        })

      }
      else{
       
        this.snackBar.open("Password Reset Successfully....:)","",{
          duration:3000,
          verticalPosition:"top"
        })
        this.resetPassword.reset();
        this.router.navigate(['login'])

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
