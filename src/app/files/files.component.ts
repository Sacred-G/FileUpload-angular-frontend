import { Component } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import * as globals from '../globals';

@Component({
    selector: 'files',
    templateUrl: 'files.component.html'
})
export class FilesComponent {
    constructor(private api: ApiService, private router: Router, private auth: AuthService) {
        if (!auth.isAuthenticated) {
            this.router.navigate(['/login']);
        }
    }

    // MatPaginator Inputs
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    getFiles() {
        this.api.getFiles().subscribe(res => {
            console.log(res);
        });
    }
}
