import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { ApiProvider } from './api.provider';
import { ItemDescription } from '../models/item-description';
import { BuyParams } from '../models/buy-params';
import { AppConst } from '../utils/app-const';
import { environment } from '../../environments/environment';

@Injectable()
export class CartProvider {
  private cartItems: any = {};
  private totalPrice = 0;
  private totalItems = 0;
  private storeApiPath: string = environment.storeApiPath;

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

  constructor(private apiProvider: ApiProvider) {

  }
  public addItemToCart(item: ItemDescription) {
    const productId: string = item.productId;
    if (this.cartItems[productId]) {
      if (this.cartItems[productId].items_available > 0) {
        this.cartItems[productId].items_available = this.cartItems[productId].items_available - 1;
        this.cartItems[productId].count = this.cartItems[productId].count + 1;
        this.totalPrice = this.totalPrice + item.cost;
        this.totalItems += 1;
      }
    } else {
      if (item.items_available > 0) {
        this.cartItems[productId] = Object.assign({}, item);
        this.cartItems[productId].max_items = this.cartItems[productId].items_available;
        this.cartItems[productId].items_available = this.cartItems[productId].items_available - 1;
        this.cartItems[productId].count = 1;
        this.totalPrice = this.totalPrice + item.cost;
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
        this.totalItems = this.totalItems - curretnCountForThisItem;
        this.totalItems = this.totalItems + this.cartItems[ref].count;
      }
    }
  }

  public removeAllItemsFromCart() {
    this.cartItems = {};
    this.totalPrice = 0;
    this.totalItems = 0;
  }
}
