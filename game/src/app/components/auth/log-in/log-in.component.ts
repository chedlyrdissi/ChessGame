import { Component } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'logIn',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

	username;
	password;



  	constructor(private httpClient: HttpClient) {}

  	submit(e, form) {
  		e.preventDefault();
  		console.log(e);
  		console.log(form);
  		// this.httpClient.get();
  	}
}
