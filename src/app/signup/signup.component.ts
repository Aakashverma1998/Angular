import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  form: any;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router, private snackBar:MatSnackBar) { 
    this.signupForm = this.formBuilder.group({
      name:new FormControl('',[Validators.required, Validators.minLength(3)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required, Validators.minLength(8)]),
      mobilenumber:new FormControl('',[Validators.required, Validators.minLength(10)] ),
      address:new FormControl('',[ Validators.required])
      
    })
    
  }
  

  ngOnInit(): void { 
  }
  signUp(){
    this.http.post(environment.apiBaseUrl+"/register",this.signupForm.value).subscribe((res:any)=>{
      console.log(res.status);
      if(res.status==400){
        this.snackBar.open('This user email already in use please enter other email....!',"",{
          duration:3000,
          verticalPosition:"top"
        })
        this.router.navigate(['signup'])
        this.signupForm.reset();
      }else{
        this.snackBar.open("User register successfully..","",{
          duration:3000,
          verticalPosition:"top"
        })
        this.signupForm.reset();
        this.router.navigate(['dashboard'])
      }
      
    },err=>{
      this.snackBar.open("Something went worng...!","",{
        duration:3000,
        verticalPosition:"top"
      })
    })
  }
}

