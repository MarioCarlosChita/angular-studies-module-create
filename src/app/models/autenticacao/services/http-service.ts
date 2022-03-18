import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { User } from '../models/user';

@Injectable()
export class httpService {
  pathUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  listar(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this.pathUrl);
  }
}
