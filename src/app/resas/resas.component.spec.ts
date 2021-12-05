import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResasComponent } from './resas.component';

describe('ResasComponent', () => {
  let component: ResasComponent;
  let fixture: ComponentFixture<ResasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
