import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilterModel, FilterOption, FilterGroup, FilterApplied } from './filter.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input() filterModel: FilterModel;
	@Input() appliedFilters = [];

  @Output() optionClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionClear: EventEmitter<any> = new EventEmitter<any>();
	@Output() clearAll: EventEmitter<void> = new EventEmitter<void>();
	
	menuOpen: boolean = false;

  constructor() {
  	window.onclick = this.clickHandler;
  }

  clickHandler = (e: any) => {
		if(e.path.filter((elem) => {return elem && elem.attributes && elem.attributes['sideMenuKeeper']}).length === 0) {
			this.menuOpen = false;
		}
	};

  toggleMenu(): void {
		this.menuOpen = !this.menuOpen;
  }

  emitOption(group: number, option: number, value: any, select: string, property: string): void {
  	this.optionClicked.emit({group: group, option: option, value: value, select: select, property: property});
  }

  // clearFilterOption(group: number, op: number, option: FilterOption): void {
  //   option.value.value = option.value.defaultValue;
  //   this.optionClear.emit({group: group, option: op});
  // }

  clearFilterOption(group: number, op: number): void {
    this.filterModel.groups[group].options[op].value.value = this.filterModel.groups[group].options[op].value.defaultValue;
    this.optionClear.emit({group: group, option: op});
  }

  clearAllFilters(): void {
    this.clearAll.emit();
  }
}
