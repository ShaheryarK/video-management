import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from'../../environments/environment'
import { CrudService } from './crud.service';
import { Video } from '../models/interfaces/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService extends CrudService<Video, string>  {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/videos`);
  }
  addVideo(data:any){
    return this._http.post<any>(`${environment.baseUrl}/videos`, data);
  }
  updateVideo(data:any,id:string){
    return this._http.put<any>(`${environment.baseUrl}/videos/${id}`, data);
  }
}
