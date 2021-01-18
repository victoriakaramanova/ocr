import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
//import { UserService } from '../user.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  errorMessage = '';

  constructor(
    private userService: AuthService,
    //private userService: UserService,
    private router: Router,
    private location: Location
    ) { }

  ngOnInit(): void {
    
  }

  submitFormHandler(formValue: { email:string, password:string}): void {
    this.isLoading = true;
    this.errorMessage='';
    //const { email: {value: email}, password: {value: password} } = this.form;
    this.userService.login(formValue).subscribe({
      next: (data) => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, 
    error: (err) => {
      this.errorMessage = 'ERROR';
      this.isLoading = false;
    }
    });
  }

  public onCancel = () => {
    this.location.back();
  }
}
