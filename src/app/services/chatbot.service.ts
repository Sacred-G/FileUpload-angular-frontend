import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as API from '../env';
import * as globals from '../globals';
 
@Injectable()
export class ChatBotService {

    constructor(private http: HttpClient, private router: Router) {}

    private static _handleError(err: HttpErrorResponse | any) {
        console.log('error thrown')
        return throwError(err.message || 'Error: Unable to complete request.');
    }

    getResponse(message) {
        const headers = new HttpHeaders().set('authorization', `Bearer ${localStorage.getItem(globals.ACCESS_TOKEN)}`)
        return this.http.post(`${API.chatbot}/response`, {'value': message }, { headers: headers })
                .pipe(catchError(ChatBotService._handleError));
    }

}