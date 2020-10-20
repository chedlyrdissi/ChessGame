import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

	username: string;
	password: string;

	btnDisabled: boolean;
	
	@Input() btnText: string = '';
	@Output('authsubmit') submitted = new EventEmitter<{username: string, password: string}>();  

	constructor() {
		this.username = '';
		this.password = '';
		this.btnDisabled = true;
	}

	submit(e) {
		e.preventDefault();
		this.submitted.emit({username: this.username, password: this.password});
		return false;
	}

	textChanged(): void {
		const disabled = this.username === '' || this.password === '';
		if(disabled !== this.btnDisabled) {
			this.btnDisabled = disabled;
		}
	}
}
