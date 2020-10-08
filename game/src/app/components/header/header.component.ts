import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  	window.onload = () => {
	  	let prevScrollpos = window.pageYOffset;
		window.onscroll = () => {
			let currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
			document.getElementById("navbar").style.top = "0";
			} else {
			document.getElementById("navbar").style.top = "-50px";
			}
			prevScrollpos = currentScrollPos;
		}
  	};
  }

  ngOnInit(): void {
  }

}
