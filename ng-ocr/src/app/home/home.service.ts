import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


const homePicUrl='https://res.cloudinary.com/stopify-cloud-v/image/upload/v1610059139/ocr/jggqd5h5k0rd4fbmibwc.jpg';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  
  constructor(private http: HttpClient) {}

  loadHomeImage(homeUrlPic: string): Observable<any> {
    return this.http.get(homeUrlPic);
  }
}