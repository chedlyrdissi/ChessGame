import { Component } from '@angular/core';
import * as $ from 'jquery/dist/jquery';
import { LogInService } from '@auth/log-in/log-in.service';
import { LogOutService } from '@auth/log-out/log-out.service';
import { RegistrationService } from '@auth/register/registration.service';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {

  	constructor(
      private logInService: LogInService,
      private logOutService: LogOutService,
      private registrationService: RegistrationService) {}

   	isLoggedIn(): boolean {
   		return this.logInService.isLoggedIn();
   	}

    logIn(credentials: {username: string, password: string}, modalId: string): void {
      this.logInService.logIn(credentials.username, credentials.password);
      $('#'+modalId).modal('hide');
    }

    register(credentials: {username: string, password: string}): void {
      this.registrationService.register(credentials.username, credentials.password);
    }

   	logOut(): void {
   	  this.logOutService.logOut();
   	}
}
