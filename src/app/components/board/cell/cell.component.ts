import { Component, Input } from '@angular/core';
import { PieceName } from '../../pieces/pieces-names.enum';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  static pieces = PieceName;
  @Input() piece;
  @Input() color;
  @Input() row;
  @Input() col;

  public ref = CellComponent;

  constructor() {
    if (this.piece) {
      console.log(this.row + ',' + this.col);    
    }
  }

  onClick = (e) => {
    alert('('+this.row+','+this.col+')clicked')
  };
}
