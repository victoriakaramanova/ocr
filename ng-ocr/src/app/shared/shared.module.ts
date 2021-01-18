import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MaterialModule } from '../material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoaderComponent,
    MaterialModule,
    SuccessDialogComponent,
    ErrorDialogComponent,
    MatProgressSpinnerModule,
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    SuccessDialogComponent, 
    ErrorDialogComponent],
  entryComponents: [
    LoaderComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
