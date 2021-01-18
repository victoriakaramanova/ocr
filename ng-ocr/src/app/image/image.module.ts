import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { ImageListComponent } from './image-list/image-list.component';
import { DetailComponent } from './detail/detail.component';
import { ImageRoutingModule } from './image-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UploadService } from './upload.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteComponent } from './delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from '../shared/loader/loader.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UploadComponent, 
    ImageListComponent, 
    DetailComponent, DeleteComponent,
    
  ],
  imports: [
    CommonModule,
    ImageRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatDialogModule,
    SharedModule
  ],
  providers: [
    UploadService
   ],
   exports: [
     UploadComponent,
     DetailComponent,
     ImageListComponent,
     DeleteComponent,
     MatTableModule,
     MatIconModule,
     MatSortModule,
     MatInputModule,
     MatPaginatorModule,
     MatDialogModule,
     MatCardModule,
     LoaderComponent
   ]
})
export class ImageModule { }
