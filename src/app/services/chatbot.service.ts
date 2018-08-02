import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as API from '../env';
 
@Injectable()
export class ChatBotService {

    constructor(private http: HttpClient, private router: Router) {}

    private static _handleError(err: HttpErrorResponse | any) {
        return Observable.throw(err.message || 'Error: Unable to complete request.');
    }

    getResponse(message) {
        return this.http.post(`${API.chatbot}/response`, {'value': message }).pipe(catchError(ChatBotService._handleError));
    }

}