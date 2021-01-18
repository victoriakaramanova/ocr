import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //@ViewChild(RouterOutlet) outlet: RouterOutlet;

  title = 'ng-ocr';
 isReady$ = this.authService.isReady$;

  constructor(
    private authService: AuthService,
    private http: HttpClient)
    //router: Router) {
    // router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
    //   const c = this.outlet.component;}
    {}
}

