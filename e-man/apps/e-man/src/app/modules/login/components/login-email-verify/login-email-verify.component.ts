import { Component } from '@angular/core';
import { NbButtonModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@Component({
  selector: 'app-login-email-verify',
  templateUrl: './login-email-verify.component.html',
  styleUrls: ['./login-email-verify.component.scss'],
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
export class LoginEmailVerifyComponent {

}
