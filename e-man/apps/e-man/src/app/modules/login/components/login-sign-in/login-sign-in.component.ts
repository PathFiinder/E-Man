import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  HttpStatusCode, ToastrServiceConfig } from '@e-man/common';
import {HttpErrorResponse} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login-sign-in',
  templateUrl: './login-sign-in.component.html',
  styleUrls: ['./login-sign-in.component.scss'],
  imports: [
    ReactiveFormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbButtonModule,
    NbLayoutModule,
    NbEvaIconsModule
  ]
})
export class LoginSignInComponent {

  formGroup!: FormGroup;
  showPassword = false;

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private toastrService: ToastrService = inject(ToastrService)

  constructor() {
    this.initializeFormGroup();
  }

  private initializeFormGroup(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  getInputType(): string {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  signIn(): void {
    const formValue = this.formGroup.getRawValue();
    console.log(formValue)
    this.authService.login(formValue.email, formValue.password).pipe(
      catchError((error) => throwError(() => error))
    ).subscribe({
      next: () => this.router.navigateByUrl('/menu/info'),
      error: (error: HttpErrorResponse) => {
        const message = error.status !== HttpStatusCode.BadRequest ? 'Something went wrong' : 'Invalid Login Credentials';
        this.toastrService.error(message, 'Error', ToastrServiceConfig);
      },
    });
  }
}
