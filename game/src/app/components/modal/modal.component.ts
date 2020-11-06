import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'chess-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnChanges, OnDestroy {

  @Input() title: string = '';
	@Input() titleClasses: string[] = [];
  @Input() triggerText: string = 'open';
	@Input() triggerTextClasses: string[] = [];
  @Input() submitBtnText: string = '';
  @Input() submitBtnTextClasses: string[] = [];
  @Input() hasFooter: boolean = true;
  @Input() closeSub: Subject<void>;

  @Output() opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<void> = new EventEmitter<void>();

  private btn: HTMLElement;
  
  constructor(private modalService: NgbModal) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['closeSub'] && changes['closeSub'].firstChange) {
      this.closeSub.subscribe(() => {
        this.btn?.click();
      });
    }
  }

  ngOnDestroy(): void {
    this.closeSub?.unsubscribe();
  }

  open(content) {
    // ugly but view content can't get the reference since it's not rendered yet
    // @ts-ignore
    this.btn = this.modalService.open(content, {scrollable: true})._contentRef.nodes[0][0].childNodes[1];
    this.opened.emit();
  }

  submit(): void {
    this.submitted.emit();
    this.btn?.click();
  }
}
