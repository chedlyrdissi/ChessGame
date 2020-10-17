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

	constructor(private httpClient: HttpClient, private router: Router) {}

	logIn(username: string, password: string) {
		this.httpClient.post("http://127.0.0.1:5000/auth/login", {
	        	username: username,
	        	password: password
	      	}).subscribe((data: UserData) => {
	         	window.sessionStorage.setItem('user', JSON.stringify(data));
	         	this.router.navigate(['/profile']);
	       	});
	}

	isLoggedIn(): boolean {
		const user = JSON.parse(window.sessionStorage.getItem('user'));
		return user !== undefined && user !== null;
	}

	getUsername(): string {
		const user = JSON.parse(window.sessionStorage.getItem('user'));
		return user.username;
	}

	getCreationDate(): Date {
		const user = JSON.parse(window.sessionStorage.getItem('user'));
		return user.created;
	}

	getLastModified(): Date {
		const user = JSON.parse(window.sessionStorage.getItem('user'));
		return user.last_modified;
	}
}