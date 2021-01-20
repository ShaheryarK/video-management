import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from'../../environments/environment'
import { NestedCategory } from '../models/interfaces/category';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CrudService<NestedCategory, string>  {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/categories`);
  }
}
