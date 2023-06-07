import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarConsumoComponent } from './gestionar-consumo.component';

describe('GestionarConsumoComponent', () => {
  let component: GestionarConsumoComponent;
  let fixture: ComponentFixture<GestionarConsumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarConsumoComponent]
    });
    fixture = TestBed.createComponent(GestionarConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
