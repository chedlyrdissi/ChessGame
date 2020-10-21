import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogInService } from '@auth/log-in/log-in.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewTypeOptions } from '@profile/view-type/view-type-options';
import { CachingService } from '@app/caching.service';
import { CachingOptions } from '@app/caching.options';


export interface ActiveGame {
	id: number,
	whitePlayer: string,
	blackPlayer: string,
	creationDate: Date
}

/*
	Querry params:
		v: view type : ViewTypeOptions

*/

@Component({
  selector: 'activeGames',
  templateUrl: './active-games.component.html',
  styleUrls: ['./active-games.component.css']
})
export class ActiveGamesComponent {

	activeGame: ActiveGame[];
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

  		this.activeGame = [];
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
  					this.viewType = this.cachingService.set(CachingOptions.VIEWTYPE, ViewTypeOptions.LIST);
  				}
  			}
  		});
  	}

	getGames = () => {
		this.httpClient
	        .get<{games: ActiveGame[]}>("http://127.0.0.1:5000/active-games")
	        .subscribe((data) => {
	        	this.activeGame = data.games;
	        })
	}

	update(auto: boolean) {
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
		        });		
		} else {
			this.router.navigate(['/', 'auth', 'logIn']);
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
