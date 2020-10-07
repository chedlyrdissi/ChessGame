import { Component } from '@angular/core';
// import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { LogInService } from '@auth/log-in/log-in.service';
import { ActivatedRoute, Router } from '@angular/router';


interface ActiveGame {
	id: number,
	whitePlayer: string,
	blackPlayer: string,
	creationDate: Date
}

@Component({
  selector: 'activeGames',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.css']
})
export class ActiveGamesComponent {

	activeGame: ActiveGame[];
	updateHandler;
	autoUpdate: boolean;

  	// constructor(private httpClient:HttpClient, private logInService: LogInService) {
  	constructor(
  		private httpClient: HttpClient, 
  		private logInService: LogInService, 
  		private actRoute: ActivatedRoute, 
  		private router: Router) {
  		this.activeGame = [];
  		this.autoUpdate = false;
  		this.update(this.autoUpdate);
  		console.log(actRoute);
  	}

	getGames = () => {
		this.httpClient
	        .get<{games: ActiveGame[]}>("http://127.0.0.1:5000/active-games")
	        .subscribe((data) => {
	        	console.log(data);
	        	this.activeGame = data.games;
	        })
	}

	update(auto) {
		console.log(auto);
		if(auto) {			
			this.updateHandler = setInterval(this.getGames, 1000, this);
		} else {
			if(this.updateHandler) {
				clearInterval(this.updateHandler);
			}
			this.getGames();
		}
	}
	
	joinGame(gameId: number): void {
		if(this.logInService.isLoggedIn()) {
			this.httpClient
		        .put("http://127.0.0.1:5000/active-games", {'gameId': gameId})
		        .subscribe((data) => {
		        	console.log(data);
		        });		
		} 
		// else {
		// 	this.router.navigate(['/', 'auth', 'logIn']);
		// }
		console.log(this.actRoute);
		console.log(this.logInService);
	}
}
