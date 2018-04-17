import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { CartProvider } from '../../providers/cart.provider';
import { VoucherCodeResponse } from '../../models/voucher-code-response';
import { AppConst } from '../../utils/app-const';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.html',
  styleUrls: ['./checkout-cart.scss']
})
export class CheckoutCartComponent implements OnInit {

  public cartItems: Array<any> = [];
  public totalPrice = 0;
  public priceAfterDiscount = 0;
  public itemsListPath = '/items';
  public loading = false;
  public isError = false;
  public optionSelected: any = {};
  public currencySymbol = AppConst.DEFAULT_CURRENCY_SYMBOL;
  public verifyingVoucher = false;

  private updateCartItemsFromProvider() {
    const cartObj = this.cartProvider.getCartItems();
    this.cartItems = [];
    Object.keys(cartObj).map((itemRef) => {
      this.cartItems.push(cartObj[itemRef]);
    });
  }

  private updatePriceFromProvider() {
    this.totalPrice = this.cartProvider.getTotalPrice();
    this.priceAfterDiscount = this.cartProvider.getPriceAfterDiscount();
  }

  constructor(private cartProvider: CartProvider,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.updateCartItemsFromProvider();
    this.updatePriceFromProvider();
  }


  handleBuyNow() {
    this.loading = true;
    this.cartProvider.buyItemsInCart()
      .subscribe((res) => {
        this.loading = false;
        console.log('res is ', res);
        this.updateCartItemsFromProvider();
        this.updatePriceFromProvider();
      }, () => {
        this.loading = false;
        this.isError = true;
      });
  }

  handleRemoveItem(ref: string) {
    this.cartProvider.removeItem(ref);
    this.updateCartItemsFromProvider();
    this.updatePriceFromProvider();
  }

  getQuantity(ref: string): number {
    const item = this.cartItems.find((cartItem) => cartItem.productId.toString() === ref.toString());
    if (item) {
      return item.count;
    }
    return 0;
  }

  handleQuantityChange($event, ref: string) {
    console.log($event, ref);
    this.cartProvider.updateQuantityOfItem(ref, Number($event.target.value));
    this.updatePriceFromProvider();

  }

  getQuantityList(ref: string): Array<number> {
    const itemsCount = [];
    const item = this.cartItems.find((cartItem) => cartItem.productId.toString() === ref.toString());

    if (item && item.max_items) {
      const maxAvailable = item.max_items;
      for (let i = 0; i < maxAvailable; i++) {
        itemsCount.push(i + 1);
      }
    }
    return itemsCount;

  }

  handleEmptyCart() {
    this.cartProvider.removeAllItemsFromCart();
    // Since we manage the cart items in provider in a different structure (to optimise the space)
    // we have to check and update the items and price for the cart
    this.updateCartItemsFromProvider();
    this.updatePriceFromProvider();
  }

  handleVoucherAdded(voucher: string) {
    this.verifyingVoucher = true;

    this.cartProvider.verifyVoucherCode(voucher).subscribe((res: VoucherCodeResponse) => {
      this.updatePriceFromProvider();
      this.snackBar.open(res.description, 'Dismiss', {
        duration: 2000,
      });
      this.verifyingVoucher = false;
    },
    (err) => {
      this.verifyingVoucher = false;
      this.snackBar.open('Error while applying voucher. Please try later.', 'Dismiss', {
        duration: 2000,
      });
    });
    console.log('voucher is ', voucher);
  }
}
