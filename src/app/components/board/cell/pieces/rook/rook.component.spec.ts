import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RookComponent } from './rook.component';

describe('RookComponent', () => {
  let component: RookComponent;
  let fixture: ComponentFixture<RookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
