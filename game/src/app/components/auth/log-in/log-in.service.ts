import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

class UserData {
	id: number;
    username: string;
    created: Date;
    last_modified: Date;
}

@Injectable()
export class LogInService {

	private user: UserData;

	constructor(private httpClient: HttpClient, private router: Router) {}

	logIn(username: string, password: string) {
		this.httpClient.post("http://127.0.0.1:5000/auth/login", {
	        	username: username,
	        	password: password
	      	}).subscribe((data: UserData) => {
	         	console.log(data);
	         	this.user = data;
	         	window.sessionStorage.setItem('user', JSON.stringify(data));
	         	this.router.navigate(['/profile/active']);
	       	});
	}

	isLoggedIn(): boolean {
		if(!this.user) {
			this.user = JSON.parse(window.sessionStorage.getItem('user'));
		}
		return this.user !== undefined && this.user !== null;
	}

	getUsername(): string {
		if(!this.user) {
			this.user = JSON.parse(window.sessionStorage.getItem('user'));
		}
		return this.user.username;
	}

	getCreationDate(): Date {
		if(!this.user) {
			this.user = JSON.parse(window.sessionStorage.getItem('user'));
		}
		return this.user.created;
	}

	getLastModified(): Date {
		if(!this.user) {
			this.user = JSON.parse(window.sessionStorage.getItem('user'));
		}
		return this.user.last_modified;
	}
}