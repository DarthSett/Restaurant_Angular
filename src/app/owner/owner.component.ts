import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user';
import {CreateUserComponent, DeleteUserComponent} from '../super-admin-list/super-admin-list.component';
import {MatDialog} from '@angular/material';
import {JwtHelperService} from '@auth0/angular-jwt';
import {OwnerService} from '../owner.service';
import {Restaurant} from '../restaurant';
import {DeleteRestaurantComponent} from '../restaurant/restaurant.component';
import {RestaurantService} from '../restaurant.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  owner = new User();
  rank: number;
  jwthelper = new JwtHelperService();
  id: number;
  rests: Restaurant[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private restService: RestaurantService,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.getOwner();
    this.rank = this.jwthelper.decodeToken(window.localStorage.getItem('token')).rank;
    this.id = this.jwthelper.decodeToken(window.localStorage.getItem('token')).id;
  }

  delRest(e: Event, rest: Restaurant) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const dialogRef = this.dialog.open(DeleteRestaurantComponent, {
      width: '250px',
      data: {Sure: false, Name: rest.Name}
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was closed.');
      console.log(result);
      if (result.Sure) {
        this.restService.deleteRest(rest.ID.toString()).subscribe(resp => {
          console.log(resp);
        });
      }
    });
  }

  delOwner() {
    // console.log(e, 'onDEL');
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '250px',
      data: {Sure: false, Name: this.owner.Name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.Sure) {
        this.ownerService.deleteOwner(this.owner.ID).subscribe(resp => {
          console.log(resp);
          this.router.navigate(['owner']);
        }, error => console.log(error));
      }}, err => console.log(err));
  }
  getOwner() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ownerService.getOwner(id).subscribe(resp => {
      console.log(resp);
      this.owner = resp.user;
      this.rests = resp.Restaurants;
      console.log(this.owner, this.rests);
    } , error => console.log(error));
  }
  updateOwner() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '250px',
      data: {Name: this.owner.Name, Email: this.owner.Email, Pass: this.owner.Pass}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result.ID = this.owner.ID;
      console.log(result);
      this.ownerService.updateOwner(result).subscribe(
        resp => {
          console.log(resp);
          this.owner.Name = result.Name;
          this.owner.Email = result.Email;
          console.log(this.owner);
        }
      );
    }, error => {console.log(error); });
  }
}

