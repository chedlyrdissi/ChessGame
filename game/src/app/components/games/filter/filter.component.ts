import { Component, Input } from '@angular/core';
import { FilterModel } from './filter';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

	@Input() filterModel: FilterModel;
	menuOpen: boolean = false;

  constructor() {
  	window.onclick = (e) => {
  		if(e.path.filter((elem) => {return elem && elem.attributes && elem.attributes['sideMenuKeeper']}).length === 0) {
  			this.menuOpen = false;
  		}
  	};
  }

  ngOnInit(): void {
  }

  toggleMenu(): void {
		this.menuOpen = !this.menuOpen;
  }

}
