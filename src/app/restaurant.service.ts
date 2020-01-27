import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiurl = 'http://localhost:4000/rest/';
  constructor(
    private http: HttpClient
  ) { }

  getRestList(): Observable<any> {
    return this.http.get<Restaurant[]>(this.apiurl + 'list', {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  getRest(id: string): Observable<any> {
    return this.http.get<Restaurant>(this.apiurl + 'get/' + id, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  updateRest(rest: Restaurant): Observable<any> {
    return this.http.put(this.apiurl + 'update', rest, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  createRest(rest: Restaurant): Observable<any> {
    return this.http.post(this.apiurl + 'create', rest, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  deleteRest(id: string): Observable<any> {
    return this.http.delete(this.apiurl + 'del/' + id, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
}
