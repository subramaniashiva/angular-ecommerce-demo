import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ItemsListItem } from '../../models/items-list-item';
import { AppConst } from '../../utils/app-const';

@Component({
  selector: 'app-items-list-item',
  templateUrl: './items-list-item.component.html',
  styleUrls: ['./items-list-item.component.scss']
})
export class ItemsListItemComponent {

  @Input()
  item: ItemsListItem;

  @Output()
  onItemClick: EventEmitter<ItemsListItem> = new EventEmitter<ItemsListItem>();

  @Output()
  onAddToCartClick: EventEmitter<ItemsListItem> = new EventEmitter<ItemsListItem>();

  public addToCartText = 'Add To Cart';
  public currencySymbol = AppConst.DEFAULT_CURRENCY_SYMBOL;

  constructor() { }

  handleCardClick(event) {
    if (event.target.id !== 'items-list-item__add-card' && event.target.textContent !== this.addToCartText) {
      this.onItemClick.emit(this.item);
    }
  }

  handleAddToCardClick() {
    this.onAddToCartClick.emit(this.item);
  }
}
