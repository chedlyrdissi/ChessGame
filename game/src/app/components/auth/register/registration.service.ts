import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from '../log-in/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

	constructor(private httpClient: HttpClient, private router: Router) {}
	
	register(username: string, password: string) {
		this.httpClient.post("http://127.0.0.1:5000/auth/register", {
	        	username: username,
	        	password: password
	      	}).subscribe((data: UserData) => {
	         	window.sessionStorage.setItem('user', JSON.stringify(data));
	         	this.router.navigate(['/home']);
	       	});
	}
}
