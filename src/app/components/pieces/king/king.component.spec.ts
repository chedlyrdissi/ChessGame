import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KingComponent } from './king.component';

describe('KingComponent', () => {
  let component: KingComponent;
  let fixture: ComponentFixture<KingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
