import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IImage, IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';
import { UploadService } from '../upload.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';


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
      data: {}
    }

    this.getImageDetails();
  }
  public onCancel = () => {
    this.location.back();
  }
  // private getImageById =()=> {
  //   const imageId: string = this.activatedRoute.snapshot.params['id'];
  //   const url: string = `api/images/${imageId}`;
  // }

  private getImageDetails = () => {
    const id = this.activatedRoute.snapshot.params.id;
      this.uploadService.getDetails(id)
      .subscribe(image => {
      this.image = image;
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
 
  public deleteImage = () => {
    const id = this.activatedRoute.snapshot.params.id;
    this.uploadService.delete(id)
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
