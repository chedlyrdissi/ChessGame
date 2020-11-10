import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

	@ViewChild('second') second;

  constructor() {
  	setTimeout(()=>{
  		this.second.nativeElement.play();
  	}, 2000);
  }
}
