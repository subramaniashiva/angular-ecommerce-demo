import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherCodeComponent } from './voucher-code.component';

describe('VoucherCodeComponent', () => {
  let component: VoucherCodeComponent;
  let fixture: ComponentFixture<VoucherCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
