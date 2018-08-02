import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
    selector: 'nav',
    template: `
    <mat-toolbar [color]="'cool'">
        <button mat-button [color]="'nav-item'" routerLink="/">Home</button>
        <button mat-button [color]="'nav-item'" routerLink="/files">Files</button>
        <button mat-button [color]="'nav-item'" routerLink="/upload">Upload</button>
        <button mat-button [color]="'nav-item'" routerLink="/chatbot">Chatbot</button>
        <span style="flex: 1 1 auto;"></span>
        <button *ngIf="!auth.isAuthenticated" mat-button [color]="'nav-item'" routerLink="/login">Sign In</button> 
        <button *ngIf="!auth.isAuthenticated" mat-button [color]="'nav-item'" routerLink="/register">Register</button>
        <button *ngIf="auth.isAuthenticated" (click)="auth.logout()" mat-button [color]="'nav-item'">Log out</button> 
    </mat-toolbar>
    `
})
export class NavComponent {
    constructor(private auth: AuthService) {}
}
