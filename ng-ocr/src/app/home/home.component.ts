import { Component, DoCheck, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { UserService } from '../user/user.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

   isLogged = false;

   url: string;
   public homeText: string;
  homePicUrl='https://res.cloudinary.com/stopify-cloud-v/image/upload/v1610059139/ocr/jggqd5h5k0rd4fbmibwc.jpg';

  constructor(
    private userService: UserService,
    private homeService: HomeService,
    //router: Router
    ) {
      // router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      //   this.url = e.url;
    //})
  }

   public executeSelectedChange = (event) => {
    console.log(event);
  }

  // ngDoCheck(): void {
  //   this.isLogged = this.userService.isLogged;
  // }

  ngOnInit() {
    this.homeText = "Welcome home";
    this.homeService.loadHomeImage(this.homePicUrl)//.subscribe(pic=>{
      //this.homePicUrl = pic
    //})
  }
}
