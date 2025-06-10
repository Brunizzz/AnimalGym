import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaseFormTemplateComponent } from './clase-form-template.component';

describe('ClaseFormTemplateComponent', () => {
  let component: ClaseFormTemplateComponent;
  let fixture: ComponentFixture<ClaseFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaseFormTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaseFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
