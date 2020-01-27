import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  apiurl = 'http://localhost:4000/user/';
  constructor(
    private http: HttpClient
  ) { }
  getlist(): Observable<any> {
    return this.http.get(this.apiurl + 'list', {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  getOwner(id: number | string): Observable<any> {
    return this.http.get(this.apiurl + '/get/' + id, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  createOwner(a: User): Observable<any> {
    return this.http.post(this.apiurl + 'create', a,  {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  deleteOwner(id: number): Observable<any>  {
    return this.http.delete(this.apiurl + 'del/' + id, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  updateOwner(admin: User): Observable<any> {
    return this.http.put(this.apiurl + 'update', admin, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
}
