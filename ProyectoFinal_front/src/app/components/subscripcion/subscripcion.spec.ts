import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subscripcion } from './subscripcion';

describe('Subscripcion', () => {
  let component: Subscripcion;
  let fixture: ComponentFixture<Subscripcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subscripcion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subscripcion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
