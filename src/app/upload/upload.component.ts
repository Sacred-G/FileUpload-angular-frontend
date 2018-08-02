import { Component } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as $ from "jquery";
import * as globals from '../globals';
import * as API from '../env';

const helper = new JwtHelperService();

@Component({
    selector: 'upload-component',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent {

    private files: any = [];
    private uploaded: any = [];
    private uploading: any[] = [];

    private deleteIndex: number;
    private progress: number[] = [];
    private message: string[] = [];


    constructor(private http: HttpClient, private router: Router) {
        if (helper.isTokenExpired(localStorage.getItem(globals.TOKEN_ID))) {
            localStorage.removeItem(globals.TOKEN_ID);
            localStorage.removeItem(globals.EXPIRATION);
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        $(function () {
            $("#upload-link").on('click', function (e) {
                e.preventDefault();
                $("#upload:hidden").trigger('click');
            });
        });
    }

    add(files) {
        for (var i = 0; i < files.length; ++i) {
            if (!(this.files.indexOf(files[i]) >= 0))
                this.files.push(files[i]);
        }
    }

    remove(index) {
        if (index > -1) {
            this.files.splice(index, 1);
            this.message.splice(index, 1);
            this.progress.splice(index, 1);
            this.uploading.splice(index, 1);
            this.deleteIndex = index;
        }
    }

    removeAll() {
        this.files = [];
        this.message = [];
        this.progress = [];
        this.uploading = [];
    }

    upload(file, index) {

        if (this.uploaded.indexOf(file) >= 0) return;
        if (this.uploading.indexOf(file) >= 0) return;

        const formData = new FormData();
        formData.append(file.name, file);

        const headers = new HttpHeaders({
            'security-token': localStorage.getItem(globals.TOKEN_ID)
        })

        const uploadReq = new HttpRequest('POST', `${API.website}/upload`, formData, {
            headers: headers,
            reportProgress: true,
        });

        var length = this.files.length
        this.uploading[index] = file;
        this.http.request(uploadReq).subscribe(event => {

            // Uploading cancelled due to item removal
            if (!(this.uploading.indexOf(file) >= 0)) return;

            // Updating index of item through removal of items on table
            var diff = length - this.files.length;
            if (index >= this.deleteIndex) {
                index -= diff;
                length = this.files.length;
            }

            // Send data
            if (event.type === HttpEventType.UploadProgress) {
                this.progress[index] = Math.round(100 * event.loaded / event.total);
            } else if (event.type === HttpEventType.Response) {
                this.message[index] = event.body.toString();
                this.uploaded.push(file);
            }
        });
    }

    uploadAll() {
        if (this.files.length === 0) return;

        for (var i = 0; i < this.files.length; ++i) {
            this.upload(this.files[i], i);
        }
    }


}

