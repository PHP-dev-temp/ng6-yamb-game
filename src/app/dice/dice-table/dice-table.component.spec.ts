import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceTableComponent } from './dice-table.component';

describe('DiceTableComponent', () => {
  let component: DiceTableComponent;
  let fixture: ComponentFixture<DiceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
