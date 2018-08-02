import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './services/validation.service';
import { style } from '../../node_modules/@angular/animations';

// credits: https://coryrylan.com/blog/angular-form-builder-and-validation-management

@Component({
    selector: 'control-messages',
    template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
    styles: ['div {color: red; text-align: left; margin: 0px auto 10px; font-size: 15px;}'],
})
export class ControlMessages {
    @Input() control: FormControl;
    constructor() { }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}