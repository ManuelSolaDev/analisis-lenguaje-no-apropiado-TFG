import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorLayoutComponent } from './buscador-layout.component';

describe('BuscadorLayoutComponent', () => {
  let component: BuscadorLayoutComponent;
  let fixture: ComponentFixture<BuscadorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
