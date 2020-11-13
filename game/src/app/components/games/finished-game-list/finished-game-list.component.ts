import { Component, Input } from '@angular/core';
import { FinishedGame } from '@games/finished-games/finished-games.component';

@Component({
  selector: 'app-finished-game-list',
  templateUrl: './finished-game-list.component.html',
  styleUrls: ['./finished-game-list.component.css']
})
export class FinishedGameListComponent {
	@Input() finishedGame: FinishedGame[] = [];
}
