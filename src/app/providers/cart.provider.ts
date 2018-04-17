import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { ApiProvider } from './api.provider';
import { ItemDescription } from '../models/item-description';
import { BuyParams } from '../models/buy-params';
import { VoucherCodeResponse } from '../models/voucher-code-response';
import FootWearCateogryIds from '../mock/footwear-category-ids';
import { AppConst } from '../utils/app-const';
import { environment } from '../../environments/environment';

@Injectable()
export class CartProvider {
  private cartItems: any = {};
  private priceAfterDiscount = 0;
  private totalPrice = 0;
  private totalItems = 0;
  private storeApiPath = environment.storeApiPath;
  private voucherApplied = false;
  private currentVoucher = '';

  private getCartItemsReference(): Array<number> {
    const refs = [];
    Object.keys(this.cartItems).map((key) => {
      let i = 1;
      while (i <= this.cartItems[key].count) {
        refs.push(Number(key));
        i = i + 1;
      }
    });
    return refs;
  }

  private sendBuyRequestToServer(buyParam: BuyParams): Observable<any> {
    const url: string = this.storeApiPath + AppConst.STORE_API_PATHS.buyItems;
    return this.apiProvider.httpPost(url, buyParam);
  }

  private verifyVoucherCodeFromServer(voucher: string): Observable<any> {
    const url: string = this.storeApiPath + AppConst.STORE_API_PATHS.verfiyVoucher;
    // Ideally we should use post method
    // Body should contain the cart and the voucher code
    return this.apiProvider.httpGet(url);
  }

  private getFootWearCategoryIds(): string[] {
    return FootWearCateogryIds;
  }

  private isFootwearPresent(): boolean {
    if (this.totalItems) {
      for (const i in this.cartItems) {
        if (this.cartItems[i] && this.getFootWearCategoryIds().indexOf(this.cartItems[i].categoryId) !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  private updateDiscountedPrice(): VoucherCodeResponse {
    const voucherCodeResponse = new VoucherCodeResponse;

    voucherCodeResponse.success = false;
    this.priceAfterDiscount = this.totalPrice;

    if (this.totalItems && this.totalPrice > 5 && this.voucherApplied && this.currentVoucher) {
      switch (this.currentVoucher.toUpperCase()) {
        case AppConst.VOUCHER_CODES.OFF5:
          this.priceAfterDiscount = this.totalPrice - 5;
          voucherCodeResponse.description = 'Voucher succesfully applied.';
          break;
        case AppConst.VOUCHER_CODES.OFF10:
          if (this.totalPrice > 50) {
            this.priceAfterDiscount = this.totalPrice - 10;
            voucherCodeResponse.description = 'Voucher succesfully applied.';
          } else {
            this.voucherApplied = false;
            this.currentVoucher = '';
            voucherCodeResponse.success = false;
            voucherCodeResponse.description = 'This voucher can be applied only when the cart value is above 50';
          }
          break;
        case AppConst.VOUCHER_CODES.OFF15:
          if (this.totalPrice > 75 && this.isFootwearPresent()) {
            this.priceAfterDiscount = this.totalPrice - 15;
            voucherCodeResponse.description = 'Voucher succesfully applied';
          } else {
            this.voucherApplied = false;
            this.currentVoucher = '';
            voucherCodeResponse.success = false;
            voucherCodeResponse.description =
              'This voucher can be applied only when the cart value is boave 75 and atleast one footwear is present';
          }
          break;
        default:
          this.voucherApplied = false;
          this.currentVoucher = '';
          voucherCodeResponse.success = false;
          voucherCodeResponse.description = 'Invalid voucher code. Please check.';
          break;
      }
    } else {
      this.currentVoucher = '';
      this.voucherApplied = false;
      voucherCodeResponse.description = 'Voucher cannot be applied to the current cart';
    }
    return voucherCodeResponse;
  }

  constructor(private apiProvider: ApiProvider) {

  }
  public addItemToCart(item: ItemDescription) {
    const productId: string = item.productId;
    if (this.cartItems[productId]) {
      if (this.cartItems[productId].items_available > 0) {
        this.cartItems[productId].items_available = this.cartItems[productId].items_available - 1;
        this.cartItems[productId].count = this.cartItems[productId].count + 1;
        this.totalPrice = this.totalPrice + item.cost;
        this.updateDiscountedPrice();
        this.totalItems += 1;
      }
    } else {
      if (item.items_available > 0) {
        this.cartItems[productId] = Object.assign({}, item);
        this.cartItems[productId].max_items = this.cartItems[productId].items_available;
        this.cartItems[productId].items_available = this.cartItems[productId].items_available - 1;
        this.cartItems[productId].count = 1;
        this.totalPrice = this.totalPrice + item.cost;
        this.updateDiscountedPrice();
        this.totalItems += 1;
      }
    }
  }

  public getCartItems(): any {
    return this.cartItems;
  }

  public getTotalPrice(): number {
    return Number(this.totalPrice.toFixed(2));
  }

  public getPriceAfterDiscount(): number {
    return Number(this.priceAfterDiscount.toFixed(2));
  }

  public isItemAvailable(ref: string) {
    let value = true;
    if (this.cartItems[ref]) {
      value = this.cartItems[ref].items_available > 0;
    }
    return value;
  }

  public getTotalAvailableItems(ref: string): number {
    if (this.cartItems[ref]) {
      return this.cartItems[ref].items_available;
    }
  }

  public buyItemsInCart(): Observable<any> {
    const totalItemVarieties: Array<string> = Object.keys(this.cartItems);
    if (this.cartItems && totalItemVarieties.length) {
      const buyParams = new BuyParams();
      buyParams.total_cost = this.getTotalPrice();
      buyParams.total_items = totalItemVarieties.reduce((count, item) => this.cartItems[item].count + count, 0);
      buyParams.items_ref = this.getCartItemsReference();

      const observable = new Observable(observer => {
        this.sendBuyRequestToServer(buyParams).subscribe((res) => {
        console.log('res is ', res);
        // On success, clear the cart
        this.removeAllItemsFromCart();

        observer.next(res);
        observer.complete();
        }, (err) => {
          observer.error(err);
        });
      });

      return observable;
    }
    return Observable.of(false);
  }

  public removeItem(ref: string) {
    if (this.cartItems[ref]) {
      const tempObj = this.cartItems[ref];
      this.totalPrice = this.totalPrice - (tempObj.count * tempObj.cost);
      this.updateDiscountedPrice();
      this.totalItems = this.totalItems - (tempObj.count);
      this.cartItems[ref] = null;
      delete this.cartItems[ref];
    }
  }

  public updateQuantityOfItem(ref: string, totalQuantity: number) {
    if (this.cartItems[ref]) {
      const max_available = this.cartItems[ref].max_items;
      if (totalQuantity <= max_available) {
        const currentPriceForThisItem = (this.cartItems[ref].count * this.cartItems[ref].cost);
        const curretnCountForThisItem = this.cartItems[ref].count;
        this.cartItems[ref].count = totalQuantity;
        this.cartItems[ref].items_available = max_available - totalQuantity;
        this.totalPrice = this.totalPrice - currentPriceForThisItem;
        this.totalPrice = this.totalPrice + (this.cartItems[ref].count * this.cartItems[ref].cost);
        this.updateDiscountedPrice();
        this.totalItems = this.totalItems - curretnCountForThisItem;
        this.totalItems = this.totalItems + this.cartItems[ref].count;
      }
    }
  }

  public removeAllItemsFromCart() {
    this.cartItems = {};
    this.totalPrice = 0;
    this.priceAfterDiscount = 0;
    this.totalItems = 0;
    this.voucherApplied = false;
    this.currentVoucher = '';
  }

  public verifyVoucherCode(voucher: string): Observable<VoucherCodeResponse> {
    let voucherCodeResponse = new VoucherCodeResponse();
    voucherCodeResponse.success = false;

    const observable: Observable<VoucherCodeResponse> = new Observable((observer) => {
      if (this.totalItems && voucher && !this.voucherApplied && this.totalPrice > 5) {
        this.verifyVoucherCodeFromServer(voucher).subscribe((res) => {
          this.currentVoucher = voucher;
          this.voucherApplied = true;
          voucherCodeResponse.success = true;
          voucherCodeResponse = this.updateDiscountedPrice();
          observer.next(voucherCodeResponse);
          observer.complete();
        });
      } else {
        voucherCodeResponse.description = 'Voucher cannot be applied to the current cart';
        observer.next(voucherCodeResponse);
        observer.complete();
      }
    });

    return observable;
  }

}
