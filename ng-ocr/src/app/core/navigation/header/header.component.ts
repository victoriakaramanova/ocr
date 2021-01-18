import { Component, DoCheck, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  @Output() public sidenavToggle = new EventEmitter();
  hideNavigation = false;
  subscription: Subscription;
  currentUser$ = this.authService.currentUser$;
  isLogged$ = this.authService.isLogged$;
  isReady$ = this.authService.isReady$;
  // get isLogged(): boolean {
  //   return this.userService.isLogged;
  // }

  constructor(
    private authService: AuthService,
    //public userService: UserService,
    title: Title,
    private router: Router
    ) { 
    // this.subscription = router.events.pipe(filter(e => 
    //   e instanceof ActivationEnd), throttleTime(0))
    //   .subscribe((e: ActivationEnd) => {
    //     title.setTitle(e.snapshot.data?.title);
    //   });

  }

  // loginHandler():void {
  //   this.userService.login();
  // }
  

  logoutHandler():void {
    this.authService.logout().subscribe(()=> this.router.navigate(['/user/login']));
  }

  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

