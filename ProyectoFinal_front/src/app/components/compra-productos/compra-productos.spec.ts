import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraProductos } from './compra-productos';

describe('CompraProductos', () => {
  let component: CompraProductos;
  let fixture: ComponentFixture<CompraProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
