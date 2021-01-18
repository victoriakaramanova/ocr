import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { FooterComponent } from './footer/footer.component';
import { storageServiceProvider } from './storage.service';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from '../user/user.service'
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { appInterceptorProvider } from './app.interceptor';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [ 
    FooterComponent,
    HeaderComponent,
    SidenavListComponent
],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    // HeaderComponent,
    // SidenavListComponent
  ],
  providers: [
    AuthGuard,
    storageServiceProvider,
    AuthService,
    UserService,
    appInterceptorProvider
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidenavListComponent
  ]
})
export class CoreModule { 
  // static forRoot(): ModuleWithProviders<CoreModule> {
  //   return {
  //     ngModule: CoreModule,
  //     providers:[
  //       UserService
  //     ]
  //   }
  //}
}
