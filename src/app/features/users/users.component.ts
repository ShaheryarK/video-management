import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AddDialogComponent } from './user-dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './user-dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './user-dialogs/edit/edit.dialog.component';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  icon: boolean = false;
  p: number = 1;

  users:User[] = []
  constructor(private userService: UserService,  public dialogService: MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
   this.loadData();
  }
  loadData(){
    this.ngxService.start()
    this.userService.findAll().toPromise().then(res=>{
      this.users = res;
      this.ngxService.stop();
    }).catch(error=>{
      this.ngxService.stop();
    });;
  }
  toggleIcon(){
    this.icon = !this.icon;
  }
  openAddDialog() {
    const dialogRef = this.dialogService.open(AddDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        this.loadData();
      }
    });
  }

  editUser(user:any) {

    const dialogRef = this.dialogService.open(EditDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
       this.loadData()
      }
    });
  }
  deleteUser(user:any) {
    const dialogRef = this.dialogService.open(DeleteDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
       this.loadData();
      }
    });
  }
}
