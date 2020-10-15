import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewTypeOptions } from './view-type-options';

@Component({
  selector: 'app-view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.css']
})
export class ViewTypeComponent {

	// @Input() viewOptions: ViewOptions; 
	@Input() viewOptions = [
			{icons: ['fa', 'fa-list'], action: ViewTypeOptions.LIST },
			{icons: ['fa', 'fa-th-large'], action: ViewTypeOptions.CARD }
		];; 
	@Output() optionPicked = new EventEmitter<ViewTypeOptions>();

  	constructor() {
  // 		this.viewOptions = [
		// 	{icons: ['fa', 'fa-list'], action: ViewTypeOptions.LIST },
		// 	{icons: ['fa', 'fa-th-large'], action: ViewTypeOptions.CARD }
		// ];
  	}

  	pickChoice(choice: ViewTypeOptions): void {
  		this.optionPicked.emit(choice);
  	}
}

export interface ViewOptions {
	icons: string[],
	action: ViewTypeOptions
}