import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class UserData {
	id: number;
    username: string;
    created: Date;
    last_modified: Date;
}

@Injectable({providedIn: 'root'})
export class LogInService {

	private user: UserData;

	constructor(private httpClient: HttpClient) {}

	logIn(username: string, password: string) {
		this.httpClient.post("http://127.0.0.1:5000/auth/login", {
	        	username: username,
	        	password: password
	      	}).subscribe((data: UserData) => {
	         	console.log(data);
	         	this.user = data;
	       	});
	}

	isLoggedIn(): boolean {
		return this.user !== undefined && this.user !== null;
	}

	getUsername(): string {
		return this.user.username;
	}

	getCreationDate(): Date {
		return this.user.created;
	}

	getLastModified(): Date {
		return this.user.last_modified;
	}
}