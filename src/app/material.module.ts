import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSidenavModule
} from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule
  ],
  exports: [
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule
  ]
})
export class MaterialModule {}
