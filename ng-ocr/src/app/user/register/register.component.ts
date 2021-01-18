import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/core/auth.service';
import { emailValidator, rePasswordValidatorFactory } from 'src/app/shared/validators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  isLoading = false;


  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private location: Location
    ) {
    const passwordControl = this.fb.control('', [Validators.required, Validators.minLength(5)]);
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', Validators.required, emailValidator],
      tel: [''],
      password: passwordControl,
      rePassword: ['', [Validators.required, Validators.minLength(5), rePasswordValidatorFactory(passwordControl)]]
    });
   }

  ngOnInit(): void {
  }

  submitHandler():void {
     const data = this.form.value;
     this.isLoading = true;
     this.authService.register(data).subscribe({
       next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
       },
       error: (err) => {
        this.isLoading = false;
        console.error(err);
       }
     });
  }

  public onCancel = () => {
    this.location.back();
  }
  
}

