import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationGuard } from './shared/authentication.guard';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';


const routes: Routes = [
  {
    path:'', redirectTo:'login', pathMatch:'full',
  },
  
  {
    path:'login', component:LoginComponent,
    canActivate:[AuthenticationGuard]

    
  },
  {
    path:'signup', component:SignupComponent
    
        

  },
  {
    path:'forgetpassword', component:ForgetPassComponent
        

  },
  {
    path:'resetpassword/:token', component:ResetPassComponent
        

  },
  {
    path:'dashboard', component:DashboardComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
