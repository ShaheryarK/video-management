import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NestedCategory } from 'src/app/models/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'parent', 'actions'];
  dataSource: MatTableDataSource<NestedCategory>;
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }
  ngOnInit() {}
  constructor(
    private categoryService: CategoryService,
    public dialogService: MatDialog,
    private ngxService: NgxUiLoaderService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.loadTableData();
  }

  loadTableData() {
    this.ngxService.start();
    this.categoryService
      .findAll()
      .toPromise()
      .then((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.ngxService.stop();
      })
      .catch((error) => {
        this.ngxService.stop();
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openAddDialog() {
    const dialogRef = this.dialogService.open(AddDialogComponent, {
      data: { title: '', parent: 'None' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.refreshTable();
      }
    });
  }
  startEdit(category: any) {
    const dialogRef = this.dialogService.open(EditDialogComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(category: any) {
    const dialogRef = this.dialogService.open(DeleteDialogComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  reload() {
    this.loadTableData();
  }

  private refreshTable() {
    this.reload();
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
