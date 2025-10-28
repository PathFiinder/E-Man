import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [
    `::ng-deep body {
      margin: 0 !important;
      padding: 0 !important;
    }`
  ],
})
export class AppComponent {
}
