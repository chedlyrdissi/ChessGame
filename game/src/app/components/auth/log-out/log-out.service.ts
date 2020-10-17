import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

	constructor(private router: Router) {}
	
	logOut() {
		window.sessionStorage.removeItem('user');
	    this.router.navigate(['/']);
	}
}
