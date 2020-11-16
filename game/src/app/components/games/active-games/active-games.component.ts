import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogInService } from '@auth/log-in/log-in.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ViewTypeOptions } from '@games/view-type/view-type-options';
import { CachingService } from '@app/caching.service';
import { CachingOptions } from '@app/caching.options';
import { Subject } from 'rxjs';

export interface ActiveGame {
	id: number;
	whitePlayer: string;
	blackPlayer: string;
	creationDate: Date;
}

export interface EnnemyUserData {
	id: number;
	username: string;
}

export interface NewGameResponse {
	new_game_id: number;
	game_status: number;
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

	solo: boolean = false;

	options = ViewTypeOptions;

	ennemyPlayer: EnnemyUserData;
	ennemyPlayersList: EnnemyUserData[];
  	subject: Subject<void> = new Subject<void>();

  	filterlist = {
  		groups: [
  			{options: [
  				{
  					label: 'name', 
  					value: {
	  					name: 'name',
	  					type: 'text',
	  					defaultValue: '',
	  					value: ''
	  				}
  				}
  			]},
  			{
  				label: 'other',
  				options: [
  				{
  					label: 'id',
  					value: {
	  					name: 'idnum',
	  					type: 'number',
	  					min: 0,
	  					defaultValue: '',
	  					value: ''
	  				},
	  				select: {
	  					choice: '=',
	  					options: [
		  					{label: '=', value: '='},
		  					{label: '>', value: '>'},
		  					{label: '<', value: '<'},
		  					{label: '>=', value: '<='},
		  					{label: '>=', value: '>='},
		  					{label: '!=', value: '!='}
		  				]
	  				}
	  			},
  				{
  					label: 'creation',
  					value: {
	  					name: 'creation',
	  					type: 'date'
	  				},
	  				select: {
	  					choice: '=',
	  					options: [
		  					{label: '=', value: '='},
		  					{label: '>', value: '>'},
		  					{label: '<', value: '<'},
		  					{label: '>=', value: '<='},
		  					{label: '>=', value: '>='},
		  					{label: '!=', value: '!='}
		  				]
	  				}
	  			}
  			]}
  		]
  	}

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
  					this.cachingService.set(CachingOptions.VIEWTYPE, ViewTypeOptions.LIST);
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
		        .put("http://127.0.0.1:5000/active-games", {
		        	gameId: gameId,
		        	id: this.logInService.getId()
		        })
		        .subscribe((data) => {
					this.router.navigate(['/game', data['gameId']]);
				}, (error) => {confirm(error.message);});		
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

	modalOpened(context: string): void {
		// get list of possible ennemies
		this.httpClient
	        .get<{ennemyPlayers: EnnemyUserData[]}>("http://127.0.0.1:5000/ennemy-players/"+this.logInService.getId())
	        .subscribe((data: {ennemyPlayers: EnnemyUserData[]}) => {
	        	this.ennemyPlayersList = data.ennemyPlayers;
	        })
	}

	setEnnemy = (ennemy: EnnemyUserData): void => {
		this.ennemyPlayer = ennemy;
		this.subject.next();
	}

	removeEnnemy(): void {
		this.ennemyPlayer = null;
	}

	scrolled = (e) => {
		console.log(e);
	};

	createGameSubmit(): void {
		this.httpClient.post("http://127.0.0.1:5000/active-games",
			this.ennemyPlayer? {
	        	id: this.logInService.getId(),
	        	ennemyPlayer: this.ennemyPlayer.id
	      	}: {id: this.logInService.getId()}).subscribe((data: NewGameResponse)=>{
	      		if(data.game_status === 1) {
	      			this.router.navigate(['/game', data.new_game_id])
	      		} else {
	      			console.log('updating');
	      			this.getGames();
	      		}
	      	});
	}

	toggleRadio(val: boolean): void {
		this.solo = val;
	}

	log(e): void {
		console.log(e);
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
