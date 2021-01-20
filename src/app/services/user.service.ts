import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from'../../environments/environment'
import { CrudService } from './crud.service';
import { User } from '../models/interfaces/user';
import { RegisterUser } from '../models/interfaces/user-register';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudService<User, string>  {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/users`);
  }

  registerUser(user:RegisterUser){
    console.log({user});
    return this._http.post<any>(`${environment.baseUrl}/auth/local/register`, user);
  }
}
