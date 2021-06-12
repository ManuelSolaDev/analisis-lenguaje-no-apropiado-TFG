import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducirIdConsultaComponent } from './introducir-id-consulta.component';

describe('IntroducirIdConsultaComponent', () => {
  let component: IntroducirIdConsultaComponent;
  let fixture: ComponentFixture<IntroducirIdConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroducirIdConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroducirIdConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
