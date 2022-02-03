import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProductAddComponent } from './type-product-add.component';

describe('TypeProductAddComponent', () => {
  let component: TypeProductAddComponent;
  let fixture: ComponentFixture<TypeProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeProductAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
