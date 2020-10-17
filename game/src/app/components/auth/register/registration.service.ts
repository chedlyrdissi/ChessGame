import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

	constructor(private router: Router) {}
	
	register(username: string, password: string) {
		console.log('registering');
		// window.sessionStorage.removeItem('user');
	    // this.router.navigate(['/']);
	}
}
