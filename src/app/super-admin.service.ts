import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  apiurl = 'http://localhost:4000/superadmin/';
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
  getSA(id: number | string): Observable<any> {
    return this.http.get(this.apiurl + '/get/' + id, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  createSA(sa: User): Observable<any> {
    return this.http.post(this.apiurl + 'create', sa,  {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  deleteSA(id: number): Observable<any>{
    return this.http.delete(this.apiurl + 'del/' + id,{
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
}
