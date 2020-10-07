import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogInService } from '@auth/log-in/log-in.service';
import { ActivatedRoute, Router } from '@angular/router';

interface FinishedGame {
	id: number,
	whitePlayer: string,
	blackPlayer: string,
	winner: string,
	start: Date,
	finish: Date
}

@Component({
  selector: 'finished-games',
  templateUrl: './finished-games.component.html',
  styleUrls: ['./finished-games.component.css']
})
export class FinishedGamesComponent {

	finishedGame: FinishedGame[];
	updateHandler;
	autoUpdate: boolean;

  	constructor(
  		private httpClient: HttpClient, 
  		private logInService: LogInService, 
  		private actRoute: ActivatedRoute, 
  		private router: Router) {
  		this.finishedGame = [];
  		this.autoUpdate = false;
  		this.update(this.autoUpdate);
  		console.log(actRoute);
  	}

	getGames = () => {
		this.httpClient
	        .get<{games: FinishedGame[]}>("http://127.0.0.1:5000/finished-games")
	        .subscribe((data) => {
	        	console.log(data);
	        	this.finishedGame = data.games.map((game) => {
	        		return {
	        			id: game.id,
						whitePlayer: game.whitePlayer,
						blackPlayer: game.blackPlayer,
						winner: game.winner,
						start: new Date(game.start),
						finish: new Date(game.finish)
	        		}
	        	});
	        })
	}

	update(auto) {
		if(auto) {			
			this.updateHandler = setInterval(this.getGames, 1000, this);
		} else {
			if(this.updateHandler) {
				clearInterval(this.updateHandler);
			}
			this.getGames();
		}
	}
}
