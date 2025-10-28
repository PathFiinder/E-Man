import { Routes } from '@angular/router';
import { LoginSignInComponent } from './components/login-sign-in/login-sign-in.component';
import { LoginSignUpComponent } from './components/login-sign-up/login-sign-up.component';
import { LoginSignOutComponent } from './components/login-sign-out/login-sign-out.component';
import { LoginForgotPasswordComponent } from './components/login-forgot-password/login-forgot-password.component';
import { LoginEmailVerifyComponent } from './components/login-email-verify/login-email-verify.component';

export const LoginRoutes: Routes = [
  {
    path: '',
    component: LoginSignInComponent,
  },
  {
    path: 'sign-up',
    component: LoginSignUpComponent
  },
  {
    path: 'sign-out',
    component: LoginSignOutComponent
  },
  {
    path: 'forgot-password',
    component: LoginForgotPasswordComponent
  },
  {
    path: 'email-verify',
    component: LoginEmailVerifyComponent
  }
]
