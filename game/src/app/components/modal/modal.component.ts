import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'chess-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnChanges, OnInit, OnDestroy {

  @Input() title: string = '';
	@Input() titleClasses: string[] = [];
  @Input() triggerText: string = 'open';
	@Input() triggerTextClasses: string[] = [];
  @Input() submitBtnText: string = '';
  @Input() submitBtnTextClasses: string[] = [];
  @Input() hasFooter: boolean = true;
  @Input() closeSub;

  @ViewChild('crossButton', {static: true, read: ElementRef}) cross: ElementRef<HTMLElement>;
  // @ViewChild('crossButton') set crossButton: ElementRef<HTMLElement>;

  constructor(private modalService: NgbModal) {
    let interval = setInterval((data)=>{
      console.log(data);
    }, 1000, this.crossButton);
    setTimeout((interval)=>{ clearInterval(interval); }, 20000, interval);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['closeSub'] && changes['closeSub'].firstChange) {
      this.closeSub.subscribe(() => {
        console.log('close');
        console.log(this.crossButton);
      });
    }
  }

  ngOnInit(): void {
    console.log(this);
  }

  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  open(content) {
    this.modalService.open(content, {scrollable: true});
  }

  print(e) {
    console.log(e);
  }
}
