import { Component, OnInit} from '@angular/core';
import {Restaurant} from '../restaurant';
import {RestaurantService} from '../restaurant.service';
import {Router} from '@angular/router';
import {UpdateRestaurantComponent} from '../restaurant/restaurant.component';
import {MatDialog} from '@angular/material';
import {JwtHelperService} from '@auth0/angular-jwt';


@Component({
  selector: 'app-restlist',
  templateUrl: './restlist.component.html',
  styleUrls: ['./restlist.component.css'],

})
export class RestlistComponent implements OnInit {
  restaurants: Restaurant[];
  rest = new Restaurant();
  rank: number;
  jwtHelper = new JwtHelperService();
  ID: number;
  constructor(
    private RestService: RestaurantService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getlist();
    this.rank = this.jwtHelper.decodeToken(window.localStorage.getItem('token')).rank;
    this.ID = this.jwtHelper.decodeToken(window.localStorage.getItem('token')).id;
  }


  createrest() {
    const dialogRef = this.dialog.open(UpdateRestaurantComponent, {
      width: '250px',
      data: {Name: this.rest.Name, Tables: this.rest.Tables, Lat: this.rest.Lat, Long: this.rest.Long, Owner: this.rest.Owner}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.rest = result;
      if (this.rest.Name && this.rest.Tables && this.rest.Lat && this.rest.Long && this.rest.Owner) {
        this.RestService.createRest(this.rest).subscribe(resp => {
          console.log(resp, this.rest);
          this.rest.ID = resp.Id;
          this.restaurants.push(this.rest);
          console.log(this.restaurants);
        }, err => console.log(err));
      } else {
        console.log('No Input From User');
      }
    });
  }

  getrest(id: string) {
    this.router.navigate(['rest/' + id]);
  }
  getlist() {
    this.restaurants = [];
    this.RestService.getRestList().subscribe(rests => {
      console.log(rests);
      this.restaurants = rests;
      for (let i = 0; i < this.restaurants.length; i++) {
        rests[i].ID = rests[i].Id;
      }
      console.log(this.restaurants);
    } , err => console.log(err));
  }
}
