import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IImage, IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';
import { UploadService } from '../upload.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { LanguageDictionary } from '../../../assets/languageDictionary';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  //public errorMessage: string = '';
  public image: IImage;
  public user: IUser;
  private dialogConfig;
  currentImage: any;
  languageDictionary = new LanguageDictionary();
  languageText: string='';
  id1: string;
  id2: string;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private uploadService: UploadService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {},
    },
      this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id1 = params['id1'];
          this.id2 = params['id2'];
          console.log(this.id1 + ' ' +this.id2);
        }
      )
   

    this.getImageDetails(this.id1);
  }
  public onCancel = () => {
    this.location.back();
  }
  // private getImageById =()=> {
  //   const imageId: string = this.activatedRoute.snapshot.params['id'];
  //   const url: string = `api/images/${imageId}`;
  // }

  private getImageDetails = (id1) => {
    //const id = this.activatedRoute.params.id1;
      this.uploadService.getDetails(id1)
      .subscribe(image => {
      this.image = image;
      this.image.languageText=this.languageDictionary.langs.find((v)=>v.value==image.language).show
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
  }

  // public redirectToUserImages = () => {
  //   const userId = this.user._id;
  //   this.router.navigate([`/images/${userId}`]);
  // }
 
  public deleteImage = (id1, id2) => {
    
    //const public_id = this.activatedRoute.snapshot.params
    //console.log(this.activatedRoute.snapshot.params)
    this.uploadService.delete(id1, id2)
      .subscribe(res => {
        const dialogRef = this.dialog.open(SuccessDialogComponent,this.dialogConfig);

        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
  }
}
