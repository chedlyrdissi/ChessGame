import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActiveGame } from '@games/active-games/active-games.component';

@Component({
  selector: 'app-active-game-card',
  templateUrl: './active-game-card.component.html',
  styleUrls: ['./active-game-card.component.css']
})
export class ActiveGameCardComponent {

  	@Output() join = new EventEmitter<number>();

	@Input() activeGame: ActiveGame[];

  	constructor() {}

  	joinGame(gameId: number): void {
  		this.join.emit(gameId);
  	}
}
