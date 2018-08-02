import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as API from '../env';
 
@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private router: Router) {}

    getFiles() {
        return this.http.get(`${API.website}/api/files`);
    }

    uploadFiles(files) {
        this.http.post<any>(`${API.website}/files/upload`, files).subscribe(res => {
            console.log(res);
        });
    }

}