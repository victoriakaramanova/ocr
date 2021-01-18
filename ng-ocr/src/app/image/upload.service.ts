import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpParams } from  '@angular/common/http';  
import { catchError, map, tap } from  'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IImage, IUser, TheObjectWithId } from '../shared/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from '../core/auth.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  currentUser$ = this.authService.currentUser$;
  userId: string;

  //private _currentImage: BehaviorSubject<IImage | null> = new BehaviorSubject(undefined);
  currentImage: IImage | null;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
    ) { }

  public upload(formData: any) {
    //return this.httpClient.post<IImage>(`${apiUrl}/images/upload`, formData, {
    return this.httpClient.post<IImage>(`/images/upload`, formData, {
      reportProgress: true,
      observe: 'events',
      //withCredentials: true
    });
  };

  public recognize(url: string, language: string) {
    let params = new HttpParams().set('url', url).set('language', language);
    //return this.httpClient.get<any>(`${apiUrl}/images/reckon`,{ params,
    return this.httpClient.get<any>(`/images/reckon`,{ params,
      //withCredentials: true
    });
  }

  //loadUserImages(curUserId: string): Observable<IImage[]> {
  loadUserImages(): Observable<IImage[]> {
    //const user=this.authService.updateCurrentUser(currentUser$);
    return this.httpClient
      //.get<IImage[]>(`${apiUrl}/images/all/${curUserId}`, {
       //.get<IImage[]>(`${apiUrl}/images/all`, {
      .get<IImage[]>(`/images/all`, {
        //withCredentials: true
      })
      ;
  }

 

  // loadDetails(id: string): Observable<IImage> {
  //   return this.httpClient.get<IImage>(`${apiUrl}/images/detail/${id}`, {withCredentials: true});
  // }

  getDetails(imageId:string): Observable<any> {
    //return this.httpClient.get(`${apiUrl}/images/detail/${imageId}`, {withCredentials: true}).pipe(
    return this.httpClient.get(`/images/detail/${imageId}`).pipe(
      tap((image: IImage) => this.currentImage = image)
      )
    //catchError(()=>{this.currentImage=null; return of(null);})
  
}

  updateDetails(data: any): Observable<IImage> {
    //return this.httpClient.put(`${apiUrl}/images/detail`, data, {withCredentials: true}).pipe(
    return this.httpClient.put(`/images/detail`, data).pipe(
      tap((image: IImage) => this.currentImage = image)
    );
  }

  delete(imageId: string): Observable<any> {
    //return this.httpClient.delete(`${apiUrl}/images/delete/${imageId}`, {withCredentials: true}).pipe(
    return this.httpClient.delete(`/images/delete/${imageId}`).pipe(
      tap((image: IImage) => this.currentImage = image)
    );
  }

  // loadDetails(id: string): Observable<IImage> {
  //   return this.httpClient.get<IImage>(`${apiUrl}/images/detail/${id}`, {withCredentials: true});
  // }
}
