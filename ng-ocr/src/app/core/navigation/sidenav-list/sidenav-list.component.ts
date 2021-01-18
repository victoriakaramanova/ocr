import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, DoCheck {

  @Output() sidenavClose = new EventEmitter();
  currentUser$ = this.authService.currentUser$;
  isReady$ = this.authService.isReady$;
  // get isLogged(): any {
  //   return this.authService.isLogged$;
  // }
  isLogged$ = this.authService.isLogged$;

  constructor(
    //public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {}

  logoutHandler():void {
    this.authService.logout().subscribe(()=> this.router.navigate(['/user/login']));
  }

  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  ngDoCheck(): void {
    this.isLogged$ = this.authService.isLogged$;
  }

}
