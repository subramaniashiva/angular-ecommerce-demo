import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { MaterialModule } from './modules/material.module';

// Container Components
import { ItemListComponent } from './containers/item-list/item-list';
import { ItemDescComponent } from './containers/item-desc/item-desc';
import { CheckoutCartComponent } from './containers/checkout-cart/checkout-cart';

// Dumb Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ItemsListItemComponent } from './components/items-list-item/items-list-item.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NetworkErrorComponent } from './components/network-error/network-error.component';

// Providers
import { CartProvider } from './providers/cart.provider';
import { ApiProvider } from './providers/api.provider';
import { ItemsProvider } from './providers/items.provider';
import { VoucherCodeComponent } from './components/voucher-code/voucher-code.component';

// Routes
const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: 'items/:ref', component: ItemDescComponent },
  { path: 'checkout', component: CheckoutCartComponent },
  { path: '**', redirectTo: 'items' },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MaterialModule
  ],
  providers: [
    CartProvider,
    ApiProvider,
    ItemsProvider
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemListComponent,
    ItemDescComponent,
    CheckoutCartComponent,
    ItemsListItemComponent,
    LoadingSpinnerComponent,
    NetworkErrorComponent,
    VoucherCodeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
