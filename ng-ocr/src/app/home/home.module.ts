import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from '../home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from './home.service';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    HomeService
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { 
  static forRoot(): ModuleWithProviders<HomeModule> {
    return {
      ngModule: HomeModule,
      providers: [
        HomeService
      ]
    }
  }
}