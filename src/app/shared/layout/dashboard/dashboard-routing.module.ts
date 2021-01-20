import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component:DashboardComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('../../../features/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'videos',
        loadChildren: () =>
          import('../../../features/videos/videos.module').then((m) => m.VideosModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../../../features/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      }
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
