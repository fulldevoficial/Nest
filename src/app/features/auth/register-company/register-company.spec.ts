import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompany } from './register-company';

describe('RegisterCompany', () => {
  let component: RegisterCompany;
  let fixture: ComponentFixture<RegisterCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCompany);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
