import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueoUsuarios } from './bloqueo-usuarios';

describe('BloqueoUsuarios', () => {
  let component: BloqueoUsuarios;
  let fixture: ComponentFixture<BloqueoUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloqueoUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloqueoUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
