import { Component } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    error

    form: FormGroup

    constructor(private auth: AuthService,
        private fb: FormBuilder,
        private router: Router) {

        this.form = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    login(credentials) {
        this.auth.login(credentials).subscribe(
            res => {
                console.log("User has logged in");
                this.auth.authenticate(res);
            },
            (err) => { this.error = err.error });
    }
}


