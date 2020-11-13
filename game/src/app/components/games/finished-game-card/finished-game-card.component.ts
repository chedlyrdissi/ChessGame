import { Component, Input } from '@angular/core';
import { FinishedGame } from '@games/finished-games/finished-games.component';

@Component({
  selector: 'app-finished-game-card',
  templateUrl: './finished-game-card.component.html',
  styleUrls: ['./finished-game-card.component.css']
})
export class FinishedGameCardComponent {

	@Input() finishedGame: FinishedGame[];

  	constructor() {}
}
