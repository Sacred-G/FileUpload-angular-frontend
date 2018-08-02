import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import {
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FilesComponent } from './files/files.component';
import { UploadComponent } from './upload/upload.component';
import { ChatBotComponent } from './chatbot/chatbot.component';
import { ControlMessages } from './control.component';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { ChatBotService } from './services/chatbot.service';
import { ValidationService } from './services/validation.service';
import { UploadDirective } from './directives/upload.directive';

import { ExamplesApiService } from './example/example-api.service';


const routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'files', component: FilesComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'chatbot', component: ChatBotComponent },
]

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        FilesComponent,
        ChatBotComponent,
        UploadComponent,
        UploadDirective,
        ControlMessages,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        NgxAutoScrollModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:4002'],
                blacklistedRoutes: ['localhost:4002/api/account/']
            }
        }),
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
        FileUploadModule
    ],
    providers: [AuthService, ApiService, ChatBotService, ValidationService, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }, ExamplesApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
