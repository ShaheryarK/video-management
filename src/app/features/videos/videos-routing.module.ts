import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoByCategoryComponent } from './video-by-category/video-by-category.component';
import { VideoByTagsComponent } from './video-by-tags/video-by-tags.component';

import { VideosComponent } from './videos.component';

const routes: Routes = [
  { path: '', redirectTo: 'by-category', pathMatch: 'full' },
  { path: 'by-category', component: VideoByCategoryComponent },
  { path: 'by-tags', component: VideoByTagsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
