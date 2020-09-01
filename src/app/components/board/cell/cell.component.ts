import { Component, Input } from '@angular/core';
// import {  } from '';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {

  @Input() piece;

}
