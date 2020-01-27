import { Injectable } from '@angular/core';
import {Food} from './food';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, range} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  apiurl = 'http://localhost:4000/rest/dish';
  constructor(
    private http: HttpClient
  ) { }
  updateFood(food: Food): Observable<any> {
     return this.http.put(this.apiurl + '/update', food, {
       headers: new HttpHeaders({
         token:  localStorage.getItem('token'),
       })
     });
  }
  createFood(food: Food): Observable<any> {
    return this.http.post(this.apiurl + '/create', food, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
  deleteFood(id: number): Observable<any> {
      return this.http.delete(this.apiurl + '/del/' + id, {
      headers: new HttpHeaders({
        token:  localStorage.getItem('token'),
      })
    });
  }
}
