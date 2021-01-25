import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUser } from '../shared/interfaces/user';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../core/storage.service';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  isLogged = false;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private authService: AuthService) {
    
    this.isLogged = this.storage.getItem('isLogged');
   }

   getCurrentUserProfile(): Observable<any> {
    return this.http.get(`/users/profile`)
      .pipe(tap((user: IUser) => this.authService.updateCurrentUser(user))
    // .pipe(tap(((user: IUser) => this.currentUser = user)),
    // catchError(() => {this.currentUser = null; return of(null); })
    );
   }

  login(data: any): Observable<any> {
    this.isLogged = true;
    this.storage.setItem('isLogged', true);
    return of(data).pipe();
    }

  // register(data: any): Observable<any> {
  //   return this.http.post(`${apiUrl}/users/register`, data, { withCredentials: true})
  //     .pipe(tap((user: IUser) => this.currentUser = user)
  //   );
  // }

  logout(): Observable<any> {
    this.isLogged = false;
    this.storage.setItem('isLogged', false);
    return of(null).pipe();
  }

  updateProfile(data: any): Observable<IUser> {
    //return this.http.put(`${apiUrl}/profile`, data).pipe(
    return this.http.put(`${apiUrl}/users/profile`, data, {withCredentials: true}).pipe(
      //tap((user: IUser) => this.currentUser = user)
      tap((user: IUser) => this.authService.updateCurrentUser(user))
    );
  }
}
