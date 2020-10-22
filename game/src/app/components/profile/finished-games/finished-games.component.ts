import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogInService } from '@auth/log-in/log-in.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ViewTypeOptions } from '@profile/view-type/view-type-options';
import { CachingService } from '@app/caching.service';
import { CachingOptions } from '@app/caching.options';


export interface FinishedGame {
	id: number;
	whitePlayer: string;
	blackPlayer: string;
	winner: string;
	start: Date;
	finish: Date;
}

/*
	Querry params:
		v: view type : ViewTypeOptions

*/

@Component({
  selector: 'finished-games',
  templateUrl: './finished-games.component.html',
  styleUrls: ['./finished-games.component.css']
})
export class FinishedGamesComponent {

	finishedGame: FinishedGame[];
	updateHandler;
	autoUpdate: boolean;
	viewType: ViewTypeOptions;

	options = ViewTypeOptions;

  	constructor(
  		private httpClient: HttpClient, 
  		private logInService: LogInService,
  		private cachingService: CachingService,
  		private actRoute: ActivatedRoute, 
  		private router: Router) {

  		this.finishedGame = [];
  		this.autoUpdate = false;
  		this.update(this.autoUpdate);
  		this.actRoute.queryParams.subscribe((params) => {
  			if(params.v && validViewType(params.v)) {
  				this.viewType = params.v;
  			} else {
  				if(this.cachingService.has(CachingOptions.VIEWTYPE)) {
	  				// get from cache
  					this.viewType = this.cachingService.get(CachingOptions.VIEWTYPE)
  				} else {
  					// set default
  					this.viewType = ViewTypeOptions.LIST;
  					this.cachingService.set(CachingOptions.VIEWTYPE, ViewTypeOptions.LIST);
  				}
  			}
  		});
  	}

	getGames = () => {
		this.httpClient
	        .get<{games: FinishedGame[]}>("http://127.0.0.1:5000/finished-games")
	        .subscribe((data) => {
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

	changeView(view: ViewTypeOptions): void {
		this.viewType = view;
  		this.cachingService.set(CachingOptions.VIEWTYPE, view);
  		const queryParams: Params = { 'v': null };
  		this.router.navigate([], 
		    {
		      relativeTo: this.actRoute,
		      queryParams: queryParams, 
		      queryParamsHandling: 'merge', // remove to replace all query params by provided
		    });
	}
}

function validViewType(view: string): boolean {
	for(let v in ViewTypeOptions) {
		if(ViewTypeOptions[v] === view) {
			return true;
		}
	}
	return false;
}
