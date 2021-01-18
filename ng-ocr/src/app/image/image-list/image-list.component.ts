import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IImage, IUser } from 'src/app/shared/interfaces';
//import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../../core/auth.service';
import { UploadService } from '../upload.service';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { map, switchMap, tap } from 'rxjs/operators';
import { LanguageDictionary } from 'src/assets/languageDictionary';


@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['url','originalname','language','updatedAt','details','delete']
  public dataSource = new MatTableDataSource<IImage>();

   @ViewChild(MatSort) sort: MatSort;

   currentUser$ = this.authService.currentUser$;
  //currentUser = this.authService.authenticate();
  curUserId: string;
  //languageText: string='';
  languageDictionary= new LanguageDictionary();
  constructor(
    private uploadService: UploadService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): any {
    //curUserId = this.activatedRoute.snapshot.params.id;
    this.authService.currentUser$.pipe(
      map((user: IUser)=> {
        this.curUserId=user._id
      }));
   
    this.uploadService.loadUserImages()
    .subscribe(res=>{
      this.dataSource.data = res as IImage[]

    })
    // this.dataSource.data.forEach((im:IImage) => {
    //   this.languageText=this.languageDictionary.langs
    //       .find((v)=>v.value==im.language).show
    //     } 
    // )
    
    this.dataSource.data.forEach((im: IImage )=> {
    im = Object.assign(im, {
      languageText: this.languageDictionary.langs
      .find((v)=>v.value==im.language).show
    }) 
  })
    
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (imageId: string) => {
    const url: string = `/images/detail/${imageId}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (imageId: string) => {
    const deleteUrl: string = `/images/delete/${imageId}`; 
    this.router.navigate([deleteUrl]); 
  }

}
