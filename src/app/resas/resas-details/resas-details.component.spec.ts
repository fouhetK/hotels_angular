import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResasDetailsComponent } from './resas-details.component';

describe('ResasDetailsComponent', () => {
  let component: ResasDetailsComponent;
  let fixture: ComponentFixture<ResasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResasDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
