import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgot } from './forgot';

describe('Forgot', () => {
  let component: Forgot;
  let fixture: ComponentFixture<Forgot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forgot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forgot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
