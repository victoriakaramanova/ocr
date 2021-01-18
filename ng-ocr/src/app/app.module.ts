import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { FooterComponent } from './core/footer/footer.component';
//import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { ImageModule } from './image/image.module';
//import { MenuComponent } from './menu/menu.component';
import { HomeModule } from './home/home.module';
import { HomeService } from './home/home.service';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { SidenavListComponent } from './core/navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './core/navigation/header/header.component';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { NgxCloudinaryWidgetModule } from 'ngx-cloudinary-upload-widget';
import { AuthService } from './core/auth.service';
import { HomeComponent } from './home/home.component';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    //MenuComponent,
    LayoutComponent,
    //HomeComponent,
    // SidenavListComponent,
    // HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    //UserModule,
    //SidenavListComponent,
    // RouterModule.forRoot([
    //   { path: 'home', component: HomeComponent },
    //   { path: '', redirectTo: '/home', pathMatch: 'full' },
    //   { path: '404', component : NotFoundComponent},
    //   { path: '**', redirectTo: '/404', pathMatch: 'full'}
    // ]),
    ImageModule,
    MaterialModule,
    FlexLayoutModule,
    HomeModule.forRoot(),
  ],
  providers: [
    //UserService
    // AuthService
  ],
  bootstrap: [
    AppComponent
    // HeaderComponent,
    // SidenavListComponent
    // FooterComponent
  ]
})
export class AppModule { }
