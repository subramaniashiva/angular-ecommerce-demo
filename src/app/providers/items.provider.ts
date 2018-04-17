import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ApiProvider } from './api.provider';
import { AppConst } from '../utils/app-const';
import { ItemsListItem } from '../models/items-list-item';
import { ItemDescription } from '../models/item-description';

import itemsListMock from '../mock/items-list';
import itemsDesriptionListMock from '../mock/items-description';

@Injectable()
export class ItemsProvider {

  private storeApiPath: string = environment.storeApiPath;

  constructor(private apiProvider: ApiProvider) {}

  getItemsList(): Observable<Array<ItemsListItem>> {
    const itemsList: string = this.storeApiPath + AppConst.STORE_API_PATHS.getItems;
    return this.apiProvider.httpGet(itemsList)
      .pipe(
        map((res: any) => {
        if (res) {
          res = itemsListMock;
          res = res.map((item) => (
            new ItemsListItem(item)
          ));
        }
        console.log('res is ', res);
        return res;
      }));
  }

  getItem(id: string): Observable<ItemDescription> {
    const pathWithId: string = AppConst.STORE_API_PATHS.itemDescription.replace('{{id}}', id);
    const itemDesc = `${this.storeApiPath}${pathWithId}`;
    return this.apiProvider.httpGet(itemDesc)
      .pipe(
        map((res: any) => {
        if (res) {
          res = itemsDesriptionListMock[Number(id) - 1];
          res = new ItemDescription(res);
        }
        return res;
      }));
  }

}
