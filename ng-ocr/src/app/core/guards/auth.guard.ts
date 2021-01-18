import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivateChild {
    
    constructor(
        private authService: AuthService,
        //private userService: UserService,
        private router: Router
        ) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      // let stream$: Observable<IUser | null>;
      // if (this.userService.currentUser === undefined) {
      //   stream$ = this.userService.getCurrentUserProfile();
      // } else {
      //   stream$ = of(this.userService.currentUser);
      // }   

      //return stream$.pipe(
      return this.authService.currentUser$.pipe(
        switchMap(user => user === undefined ? this.authService.authenticate() : [user]), 
        map((user) => {  
        const isLoggedFromData = childRoute.data.isLogged;
          return typeof isLoggedFromData !== 'boolean' || isLoggedFromData === !!user;
        }),
        tap((canContinue) => {
          if (canContinue) {return; }
          const url = this.router.url;
          this.router.navigateByUrl(url);
        }),
        first()
      );
         //return true;
    }
}
