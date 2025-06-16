import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subscripciones } from './subscripciones';

describe('Subscripciones', () => {
  let component: Subscripciones;
  let fixture: ComponentFixture<Subscripciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subscripciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subscripciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
