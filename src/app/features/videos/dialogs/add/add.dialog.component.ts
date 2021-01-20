import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
import { Video, VideoEntry } from 'src/app/models/interfaces/video';
import { FileUploader } from 'ng2-file-upload';
import { CategoryService } from 'src/app/services/category.service';
import { NestedCategory } from 'src/app/models/interfaces/category';
import { Tag } from 'src/app/models/interfaces/tag';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { TagsService } from 'src/app/services/tags.service';
// const URL = 'https://video-management-api.herokuapp.com/uploads/';

@Component({
  templateUrl: './add.dialog.component.html',
  styleUrls: ['./add.dialog.component.scss'],
})
export class AddDialogComponent {
  hide: boolean = true;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  categories: NestedCategory[] = [];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;
  tags: Tag[] = [];
  allTags: Tag[] = [];
  selectedFile: any = null;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  dataToSubmit: VideoEntry;
  previewUrl: any = '';
  loading:boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Video,
    public dataService: VideoService,
    private categoryService: CategoryService,
    private tagService: TagsService
  ) {
    this.dataToSubmit = new VideoEntry();

    this.uploader = new FileUploader({
      // url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          });
        });
      },
    });

    this.hasBaseDropZoneOver = false;
    this.categoryService
      .findAll()
      .toPromise()
      .then((res) => {
        this.categories = res;
      });
    this.tagService
      .findAll()
      .toPromise()
      .then((res) => {
        this.allTags = res;
      });
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | Tag | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  onFileDrop(event: any) {
    console.log({ event });
    this.selectedFile = event[0];
    this.onSelectFile();
  }
  submit() {
    this.loading = true;
    let tagsIds: any[] = [];
    this.tags.forEach((tag) => {
      let id = this.allTags.find((ta) => ta.name == tag.name)?.id;
      if (id) {
        tagsIds.push(id);
      } else {
        this.tagService
          .save(tag)
          .toPromise()
          .then((res) => {
            tagsIds.push(res.id);
          });
      }
    });
    console.log({ tagsId: tagsIds });
    this.dataToSubmit.tags = tagsIds;
    this.dataToSubmit.name = this.data.name;
    this.dataToSubmit.description = this.data.description;
    this.dataToSubmit.category = this.data.category.id;
    console.log(this.dataToSubmit);
    const formData: FormData = new FormData();
    formData.append(`files.video`, this.selectedFile, this.selectedFile.name);
    formData.append('data', JSON.stringify(this.dataToSubmit));
    formData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    this.dataService
      .addVideo(formData)
      .toPromise()
      .then((res) => {
        console.log({ res });
        this.loading = false;
        this.dialogRef.close(1);
      }).catch(error=>{
        this.loading = false;
      });
  }
  onSelectFile() {
    if (this.selectedFile) {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event) => {
        this.previewUrl = (<FileReader>event.target).result;
      };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      let tag: Tag = { name: value };
      this.tags.push(tag);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tagName: string): void {
    const index = this.tags.findIndex((tag) => (tag.name = tagName));

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let tag: Tag = { name: event.option.viewValue };
    this.tags.push(tag);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string | Tag): Tag[] {
    console.log({ value });
    let filterValue: any;
    if (typeof value == 'string') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.name.toLowerCase();
    }
    return this.allTags.filter(
      (tag) => tag.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
