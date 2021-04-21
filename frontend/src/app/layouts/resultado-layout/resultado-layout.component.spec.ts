import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoLayoutComponent } from './resultado-layout.component';

describe('ResultadoLayoutComponent', () => {
  let component: ResultadoLayoutComponent;
  let fixture: ComponentFixture<ResultadoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
