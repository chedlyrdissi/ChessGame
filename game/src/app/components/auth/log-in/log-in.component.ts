import { Component } from '@angular/core';
import { LogInService } from './log-in.service';

@Component({
  selector: 'logIn',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

	username: string;
	password: string;

	constructor(private logInService: LogInService) {
		console.log(logInService);
	}

	submit(e, form) {
		e.preventDefault();
    	this.logInService.logIn(this.username, this.password);
		console.log(this.logInService);
	}
}
