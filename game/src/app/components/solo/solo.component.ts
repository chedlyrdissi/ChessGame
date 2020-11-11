import { Component, ViewChild } from '@angular/core';
import { BoardComponent } from '@board/board.component';

@Component({
  selector: 'app-solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent {

	@ViewChild(BoardComponent) board: BoardComponent;

  constructor() { }

  resetGame(): void {
  	this.board.resetGame();
  }
}
