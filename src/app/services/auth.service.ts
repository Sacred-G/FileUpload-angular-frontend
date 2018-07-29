import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as globals from '../globals';

const helper = new JwtHelperService();


@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }



    get isAuthenticated() {
        return !!localStorage.getItem(globals.TOKEN_ID);
    }

    register(credentials) {
        return this.http.post<any>(`http://localhost:33644/api/account/register`, credentials);
    }

    login(credentials) {
        return this.http.post<any>(`http://localhost:33644/api/account/login`, credentials);
    }

    authenticate(res) {
        localStorage.setItem(globals.TOKEN_ID, res);
        localStorage.setItem(globals.EXPIRATION, helper.getTokenExpirationDate(res).toString());
        this.router.navigate(['/']);
    }

    logout() {
        localStorage.removeItem(globals.TOKEN_ID);
        localStorage.removeItem(globals.EXPIRATION);
        this.router.navigate(['/']);
    }

}