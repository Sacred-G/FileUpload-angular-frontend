import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import * as globals from './globals';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        var token = localStorage.getItem(globals.TOKEN_ID);

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${token}`)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}