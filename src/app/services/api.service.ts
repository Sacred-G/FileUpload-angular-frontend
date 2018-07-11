import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 
@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private router: Router) {}

    getFiles() {
        return this.http.get(`http://localhost:33644/api/files`);
    }

    uploadFiles(files) {
        this.http.post<any>(`http://localhost:33644/api/files/upload`, files).subscribe(res => {
            console.log(res);
        });
    }

}