import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AddDialogComponent } from './user-dialogs/add/add.dialog.component';
import { EditDialogComponent } from './user-dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './user-dialogs/delete/delete.dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [UsersComponent,AddDialogComponent,EditDialogComponent,DeleteDialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
})
export class UsersModule { }
