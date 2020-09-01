import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BishopComponent } from './bishop.component';

describe('BishopComponent', () => {
  let component: BishopComponent;
  let fixture: ComponentFixture<BishopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BishopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BishopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
