import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../modules/material.module';
import { VoucherCodeComponent } from './voucher-code.component';

describe('VoucherCodeComponent', () => {
  let component: VoucherCodeComponent;
  let fixture: ComponentFixture<VoucherCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MaterialModule ],
      declarations: [ VoucherCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
