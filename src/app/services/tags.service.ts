import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from'../../environments/environment'
import { CrudService } from './crud.service';
import { Tag } from '../models/interfaces/tag';

@Injectable({
  providedIn: 'root',
})
export class TagsService extends CrudService<Tag, string>  {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/tags`);
  }
}
