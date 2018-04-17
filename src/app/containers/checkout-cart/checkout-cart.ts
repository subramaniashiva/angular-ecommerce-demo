import { Component, OnInit } from '@angular/core';

import { CartProvider } from '../../providers/cart.provider';
import { AppConst } from '../../utils/app-const';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.html',
  styleUrls: ['./checkout-cart.scss']
})
export class CheckoutCartComponent implements OnInit {

  public cartItems: Array<any> = [];
  public totalPrice: number = 0;
  public itemsListPath: string = '/items';
  public loading: boolean = false;
  public isError: boolean = false;
  public optionSelected: any = {};
  public currencySymbol: string = AppConst.DEFAULT_CURRENCY_SYMBOL;

  private updateCartItemsFromProvider() {
    const cartObj = this.cartProvider.getCartItems();
    this.cartItems = [];
    Object.keys(cartObj).map((itemRef) => {
      this.cartItems.push(cartObj[itemRef]);
    });
  }

  private updateTotalPriceFromProvider() {
    this.totalPrice = this.cartProvider.getTotalPrice();
  }

  constructor(private cartProvider: CartProvider) {}

  ngOnInit() {
    this.updateCartItemsFromProvider();
    this.updateTotalPriceFromProvider();
  }


  handleBuyNow() {
    this.loading = true;
    this.cartProvider.buyItemsInCart()
      .subscribe((res) => {
        this.loading = false;
        console.log('res is ', res);
      }, () => {
        this.loading = false;
        this.isError = true;
      });
  }

  handleRemoveItem(ref: string) {
    this.cartProvider.removeItem(ref);
    this.updateCartItemsFromProvider();
    this.updateTotalPriceFromProvider();
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
    this.updateTotalPriceFromProvider();

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
    this.updateTotalPriceFromProvider();
  }

  handleVoucherAdded(voucher: string) {
    console.log('voucher is ', voucher);
  }
}
