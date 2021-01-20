import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { VideoByCategoryComponent } from './video-by-category/video-by-category.component';
import { VideoByTagsComponent } from './video-by-tags/video-by-tags.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { FileUploadModule } from 'ng2-file-upload';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { DetailDialogComponent } from './dialogs/detail/detail.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@NgModule({
  declarations: [
    VideosComponent,
    VideoByCategoryComponent,
    VideoByTagsComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    DetailDialogComponent,
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    DetailDialogComponent,
  ],
})
export class VideosModule {}
