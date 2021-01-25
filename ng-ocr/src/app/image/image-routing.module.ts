import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../core/guards/auth.guard';
import { DeleteComponent } from "./delete/delete.component";
import { DetailComponent } from './detail/detail.component';
import { ImageListComponent } from './image-list/image-list.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: 'images',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'all/:id',
        //pathMatch: 'full',
        component: ImageListComponent,
        data: {
          title: 'Images'
        }
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: {
          title: 'Detail',
          isLogged: true
        }
      },
      {
        path: 'upload',
        component: UploadComponent,
        data: {
          title: 'Upload',
          isLogged: true
        }
      },
      {
        path: 'delete/:id1/:id2',
        component: DeleteComponent,
        data: {
          title: 'Delete',
          isLogged: true
        }
      },
    ]
  }
];

export const ImageRoutingModule = RouterModule.forChild(routes);