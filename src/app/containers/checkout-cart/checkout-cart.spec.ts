import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../modules/material.module';

import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { NetworkErrorComponent } from '../../components/network-error/network-error.component';
import { VoucherCodeComponent  } from '../../components/voucher-code/voucher-code.component';

import { CartProvider } from '../../providers/cart.provider';
import { ApiProvider } from '../../providers/api.provider';
import { CheckoutCartComponent } from './checkout-cart';

describe('CheckoutCartComponent', () => {
  let component: CheckoutCartComponent;
  let fixture: ComponentFixture<CheckoutCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule, RouterTestingModule, HttpClientModule ],
      declarations: [
        CheckoutCartComponent,
        VoucherCodeComponent,
        LoadingSpinnerComponent,
        NetworkErrorComponent
      ],
      providers: [CartProvider, ApiProvider]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
