import { Component, OnInit } from '@angular/core';
// import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';

interface ActiveGame {
	id: number,
	whitePlayer: string,
	blackPlayer: string
}

@Component({
  selector: 'activeGames',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.css']
})
export class ActiveGamesComponent implements OnInit {

	// activeGame$: Observable<ActiveGame[]>;
	activeGame: ActiveGame[];
	updateHandler;
	autoUpdate: boolean;

  	constructor(private httpClient:HttpClient) {
  		this.activeGame = [];
  		this.autoUpdate = false;
  		this.update(this.autoUpdate);
  	}

	ngOnInit(): void {
		
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
}
