import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ValidationService } from '../services/validation.service';
import { User } from '../interfaces/user.interface';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public user: User;

    form
    errors

    constructor(private auth: AuthService, private fb: FormBuilder) {
        this.form = fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, ValidationService.emailValidator]],
            password: ['', [Validators.required, ValidationService.passwordValidator]],
            confirmPassword: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.user = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    register(credentials) {
        this.auth.register(credentials).subscribe(res => {
            console.log("Account successfully registered");
            this.auth.setSession(res);
        },
        (err) => { this.errors = err.error });
    }
}


