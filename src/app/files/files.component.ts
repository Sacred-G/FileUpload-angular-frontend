import { Component } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ApiService } from '../services/api.service';
import * as globals from '../globals';

const helper = new JwtHelperService();

@Component({
    selector: 'files',
    templateUrl: 'files.component.html'
})
export class FilesComponent {
    constructor(private api: ApiService, private router: Router) {
        if (helper.isTokenExpired(localStorage.getItem(globals.TOKEN_ID))) {
            localStorage.removeItem(globals.TOKEN_ID);
            localStorage.removeItem(globals.EXPIRATION);
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
