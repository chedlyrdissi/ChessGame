import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PawnComponent } from './pawn.component';

describe('PawnComponent', () => {
  let component: PawnComponent;
  let fixture: ComponentFixture<PawnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PawnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
