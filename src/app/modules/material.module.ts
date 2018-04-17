import {NgModule} from '@angular/core';

import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  declarations: []
})
export class MaterialModule {
}
