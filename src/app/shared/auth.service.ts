import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsAuthenticated: boolean = false;

  constructor(private _router: Router, private http: HttpClient) { }
  IsLoggedIn() {
    return localStorage.getItem('token');
  }
  logoutUser() {  
    return localStorage.removeItem("token");
  }
  isAuthenticated() {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    })
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiBaseUrl + "/verifytoken", { headers: httpHeaders })
        .subscribe(

          {
            next: (res: any) => {
              this.IsAuthenticated = res.message.authenticated;
              resolve(this.IsAuthenticated)
            },
            error: (e) => {
              this.IsAuthenticated = e.message.authenticated;
              reject(this.IsAuthenticated)
            },
            complete: () => console.info('complete')
          }
        );
    })
  }
  // resetPasswordApi(resetpassword:any) {
  //   const httpHeaders = new HttpHeaders({
  //     'content-type': 'application/json',
  //     'Authorization': `${localStorage.getItem('reset_token')}`
  //   })
  //   return new Promise((resolve, reject) => {
  //     this.http.post(environment.ApiBaseUrl + "/resetpassword", { headers: httpHeaders },resetpassword ).subscribe((res:any)=>{
  //       if(res.status == 400){
  //         reject('err')
  //       }else{
  //         resolve('success')
  //       }
  //     },err=>{
  //       reject('err')
  //     })
      
  //   })
  // }
}
