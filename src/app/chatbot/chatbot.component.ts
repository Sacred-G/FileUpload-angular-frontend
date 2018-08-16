import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChatBotService } from '../services/chatbot.service';
import { AuthService } from '../services/auth.service';
import * as globals from '../globals';

const helper = new JwtHelperService();

@Component({
    selector: 'chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css']
})
export class ChatBotComponent {

    message = {};
    messages: Array<any> = [];

    constructor(private router: Router, private chatbot: ChatBotService, private auth: AuthService) {
        auth.isAuthenticated;
    }

    sendMessage(message) {
        if (message === "") return;
        this.messages.push({ 'class': 'message-sent', 'value': message });
        // this.messages.push({ 'class': 'message-received', 'value': 'eyo tryo againo lato m8o' });

        // Connect with chatbot api to receive a response
        this.chatbot.getResponse(message).subscribe(res => {
            // Add response to list of messages
            this.messages.push({ 'class': 'message-received', 'value': res['value'] });
        });
    }

    onKeyDown(event: any) { // without type info
        this.sendMessage(event.target.value);
    }
}
