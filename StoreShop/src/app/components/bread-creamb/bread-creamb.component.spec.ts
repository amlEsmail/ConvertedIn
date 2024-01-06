import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCreambComponent } from './bread-creamb.component';

describe('BreadCreambComponent', () => {
  let component: BreadCreambComponent;
  let fixture: ComponentFixture<BreadCreambComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadCreambComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCreambComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
