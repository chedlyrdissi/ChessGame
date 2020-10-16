import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor() {}

  isActive(elem): boolean {
  	if(elem.attributes.class && elem.attributes['class'].value) {
  		// console.log(typeof elem.attributes['class'].value);
  		if(typeof elem.attributes['class'].value === 'string') {
  			return elem.attributes['class'].value === 'active';
  		} else {
  			return elem.attributes['class'].value.contains('active');
  		}
  	}
  	return false;
  }

}
