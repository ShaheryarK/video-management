import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedCategory } from 'src/app/models/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { DetailDialogComponent } from '../dialogs/detail/detail.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from '../dialogs/edit/edit.dialog.component';
import { Video } from 'src/app/models/interfaces/video';

@Component({
  selector: 'app-video-by-category',
  templateUrl: './video-by-category.component.html',
  styleUrls: ['./video-by-category.component.scss'],
})
export class VideoByCategoryComponent implements OnInit {
  icon: boolean = false;
  categories: NestedCategory[] = [];
  treeControl = new NestedTreeControl<NestedCategory>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<NestedCategory>();
  constructor(private categoryService: CategoryService, private ngxService: NgxUiLoaderService,public dialogService: MatDialog) {}

  ngOnInit(): void {
   this.loadData();
  }
  loadData(){
    this.ngxService.start();
    this.categoryService
    .findAll()
    .toPromise()
    .then((res) => {
      this.dataSource.data = this.transformDataTree(res);
      this.ngxService.stop();
    }).catch(error=>{
      this.ngxService.stop();
    });
  }
  toggleIcon() {
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

  openDetailDialog(video:Video) {
    const dialogRef = this.dialogService.open(DetailDialogComponent, {
      data: video
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
      }
    });
  }
  editVideo(video:any) {

    const dialogRef = this.dialogService.open(EditDialogComponent, {
      data: video
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
       this.loadData()
      }
    });
  }
  deleteVideo(video:any) {
    const dialogRef = this.dialogService.open(DeleteDialogComponent, {
      data: video
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
       this.loadData();
      }
    });
  }
  transformDataTree(data: NestedCategory[]) {
    data.forEach((category) => {
      if (category.children.length > 0) {
        let subCat: NestedCategory[] = [];
        category.children.forEach((childCategory) => {
          subCat.push(
            data.find((cat) => cat.id == childCategory.id) as NestedCategory
          );
        });
        category.children = subCat;
      }
    });
    let filteredDate = data.filter((cat) => cat.parent == null);
    return filteredDate;
  }
  getVideoCount(cat: NestedCategory) {
    let count = 0;
    count = cat.videos.length;
    cat.children.forEach((child) => {
      count = count + child.videos.length;
      if(child.children != null)
      child.children.forEach((catChild)=>{
        count += this.getVideoCount(catChild);
      })
      else return
    });
    return count;
  }
  hasChild = (_: number, node: NestedCategory) =>
    (!!node.children && node.children.length > 0) || node?.videos?.length > 0;
}
