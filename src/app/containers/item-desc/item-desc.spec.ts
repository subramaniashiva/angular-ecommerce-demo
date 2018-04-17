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
import { ItemsProvider } from '../../providers/items.provider';

import { ItemDescComponent } from './item-desc';

describe('ItemDescComponent', () => {
  let component: ItemDescComponent;
  let fixture: ComponentFixture<ItemDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule, RouterTestingModule, HttpClientModule ],
      declarations: [
        ItemDescComponent,
        VoucherCodeComponent,
        LoadingSpinnerComponent,
        NetworkErrorComponent
      ],
      providers: [CartProvider, ApiProvider, ItemsProvider]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
