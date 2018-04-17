import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ItemsProvider } from '../../providers/items.provider';
import { CartProvider } from '../../providers/cart.provider';
import { ItemDescription } from '../../models/item-description';
import { AppConst } from '../../utils/app-const';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-desc',
  templateUrl: './item-desc.html',
  styleUrls: ['./item-desc.scss']
})
export class ItemDescComponent implements OnInit {

  public currencySymbol = AppConst.DEFAULT_CURRENCY_SYMBOL;
  public loading = false;
  public isError = false;
  public item: ItemDescription;

  constructor(private itemsProvider: ItemsProvider,
    private activatedRoute: ActivatedRoute,
    private cartProvider: CartProvider,
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit() {
    const ref: string = this.activatedRoute.snapshot.paramMap.get('ref');
    this.loading = true;
    this.itemsProvider.getItem(ref)
    .subscribe((item: ItemDescription) => {
      console.log('item is ', item);
      this.item = item;
      this.loading = false;
    }, () => {
      this.loading = false;
      this.isError = true;
    });
  }

  handleAddToCardClick() {
    this.cartProvider.addItemToCart(this.item);
    this.snackBar.open('Item added to cart', 'Dismiss', {
      duration: 2000,
    });
  }

  isItemAvailable(): boolean {
    return this.cartProvider.isItemAvailable(this.item.productId);
  }

  getItemsAvailable(): number {
    const count = this.cartProvider.getTotalAvailableItems(this.item.productId);
    if (count !== undefined && count !== null) {
      return count;
    } else {
      return this.item.items_available;
    }
  }

  handleShowCart() {
    // ToDo: Move this routes to separate file
    this.router.navigate(['/checkout']);
  }
}
