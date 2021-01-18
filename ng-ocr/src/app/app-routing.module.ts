import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'HOME'
        }
      },
      {
        path: 'user',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: '404',
        component: NotFoundComponent,
        data: {
            title: '404'
        }
      },
      {
        path: '**',
        redirectTo: '/404',
      }
    ]
  }
];


// @NgModule({
//   imports: [
//     CommonModule,
//     RouterModule.forRoot(routes)
//   ],
//   exports: [
//     RouterModule
//   ],
//   declarations: []
// })

export const AppRoutingModule = RouterModule.forRoot(routes);