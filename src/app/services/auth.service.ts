import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as globals from '../globals';
import * as API from '../env';
import * as auth0 from 'auth0-js';

const helper = new JwtHelperService();


@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    get isAuthenticated(): boolean {
        // Check whether the current time is past the
        // Access Token's expiry time
        if (!!localStorage.getItem('id_token')) {
            if (helper.isTokenExpired(localStorage.getItem('id_token'))) {
                localStorage.removeItem(globals.ACCESS_TOKEN);
                localStorage.removeItem(globals.TOKEN_ID);
                localStorage.removeItem(globals.EXPIRATION);
                return false;
            }
            return true;
        }
        return false;
    }

    register(credentials) {
        return this.http.post<any>(`${API.website}/account/register`, credentials);
    }

    login(credentials) {
        return this.http.post<any>(`${API.website}/account/login`, credentials);
    }

    setSession(authResult): void {
        // Set the time that the Access Token will expire at
        localStorage.setItem('access_token', authResult['access_token']);
        localStorage.setItem('id_token', authResult['id_token']);
        localStorage.setItem('expires_at', helper.getTokenExpirationDate(authResult['id_token']).toString());
        this.router.navigate(['/']);
    }

    logout() {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem(globals.ACCESS_TOKEN);
        localStorage.removeItem(globals.TOKEN_ID);
        localStorage.removeItem(globals.EXPIRATION);
        // Go back to the home route
        this.router.navigate(['/']);
    }

}