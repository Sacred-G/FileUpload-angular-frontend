import { Component } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from "jquery";

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
        if (!localStorage.getItem('token')) {
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

    derp(event) {
        this.files = event.files;
        for (const droppedFile of event.files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry;
                fileEntry.file((file: File) => {

                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);

                    /**
                    // You could upload it like this:
                    const formData = new FormData()
                    formData.append('logo', file, relativePath)
           
                    // Headers
                    const headers = new HttpHeaders({
                      'security-token': 'mytoken'
                    })
           
                    this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                    .subscribe(data => {
                      // Sanitized logo returned from backend
                    })
                    **/

                });
            }
        }
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

        const uploadReq = new HttpRequest('POST', 'http://localhost:33644/api/upload', formData, {
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

