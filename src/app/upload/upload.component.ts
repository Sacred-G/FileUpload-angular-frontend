import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import * as $ from "jquery";

// const PORT for local testing
const PORT = 5001;
// const URL = '/api/files'; -- backend server address
const URL = `http://localhost:${PORT}/api/files/upload`;

@Component({
    selector: 'upload',
    templateUrl: './upload.component.html',
    styleUrls: ['upload.component.css'],
})
export class UploadComponent {
    public uploader: FileUploader = new FileUploader({ url: URL });
    public hasBaseDropZoneOver: boolean = false;


    ngOnInit() {
        $(function () {
            $("#upload-link").on('click', function (e) {
                e.preventDefault();
                $("#upload:hidden").trigger('click');
            });
        });
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

}