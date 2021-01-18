import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, NgZone, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IImage, IUser, Lang } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../../core/auth.service';
import { LanguageDictionary } from '../../../assets/languageDictionary';
import { UploadService } from '../upload.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  //public response: { _id, url, originalname, created_at, };
  //public image: IImage = null;

  inEditMode = false;
  currentImage: IImage=null;
  languageDictionary = new LanguageDictionary();
  //languageAbbrev: string;
  languageText: string='';
  private dialogConfig;

  // get currentUser(): IUser {
  //   return this.authService.authenticate();
  // }

  
  constructor(
    private uploadService: UploadService,
    //private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private errorService: ErrorHandlerService,
    private location: Location,
    ) { }

  // public uploadFinished = (event) => {
  //   this.response = event;
  // }

  ngOnInit(): void {
    this.getImageDetails();
  }

  private getImageDetails = () => {
    const id = this.activatedRoute.snapshot.params.id;
      this.uploadService.getDetails(id)
      .subscribe((image: IImage) => {
        this.currentImage = image;
        this.currentImage.languageText=this.languageDictionary.langs.find((v)=>v.value==image.language).show
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
  }

  toggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }

  public onCancel = () => {
    this.location.back();
  }

  submitHandler(data: any): void {
    this.uploadService.updateDetails(data).subscribe(
      // () => console.log('success'),
      // (err) => console.error('error', err),
      // () => {
      //   this.inEditMode = false;
      //   this.editEmitter$.next(this.inEditMode);
      // }
      { 
        next: () => {
          this.inEditMode = false;
          this.getImageDetails();
      },
      error: (err) => {
        console.error(err);
      }
      }
    )
  }
}
