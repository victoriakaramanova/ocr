import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IUser } from '../../shared/interfaces/user';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  inEditMode = false;
  currentUser$ = this.authService.currentUser$;

  // get currentUser(): IUser {
  //   return this.userService.currentUser;
  // }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private location: Location
    ) { }

  ngOnInit(): void {
    //this.userService.getCurrentUserProfile().subscribe();
    this.authService.authenticate();
  }

  toggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }

  submitHandler(data: any): void {
    this.userService.updateProfile(data).subscribe({
      next: () => {
        this.inEditMode = false;
        //this.authService.authenticate()
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  public onCancel = () => {
    this.location.back();
  }
}
