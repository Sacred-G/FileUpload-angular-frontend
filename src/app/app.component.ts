import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as globals from './globals';

const helper = new JwtHelperService();

@Component({
  selector: 'app-root',
  template: '<nav></nav><router-outlet></router-outlet>'
})
export class AppComponent {

  constructor() {
    if (helper.isTokenExpired(localStorage.getItem(globals.TOKEN_ID))) {
      localStorage.removeItem(globals.TOKEN_ID);
      localStorage.removeItem(globals.EXPIRATION);
    }
  }
}
