import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActiveGame } from '@profile/active-games/active-games.component';

@Component({
  selector: 'app-active-game-list',
  templateUrl: './active-game-list.component.html',
  styleUrls: ['./active-game-list.component.css']
})
export class ActiveGameListComponent {

	@Output() join = new EventEmitter<number>();

	@Input() activeGame: ActiveGame[] = [];

  	constructor() {}

  	joinGame(gameId: number): void {
  		this.join.emit(gameId);
  	}
}
