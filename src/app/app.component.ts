import { Component } from '@angular/core';
import { PieceColor } from './components/board/cell/pieces/piece-color.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChessGame';
  color = PieceColor.White;
}
