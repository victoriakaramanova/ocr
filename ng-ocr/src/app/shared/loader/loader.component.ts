import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() isLoading: boolean;

  public timer;
  public seconds: number =0;

  constructor() { }

  ngOnInit(): void {
  }

  // public startTimer =() => {
  //   this.timer = setInterval(() => {
  //     this.seconds += 1;

  //     if(this.seconds===100) {
  //       clearInterval(this.timer);
  //     }
  //   }, 10);
  // }


}