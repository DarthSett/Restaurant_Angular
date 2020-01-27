import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {User} from '../user';
import {CreateUserComponent, DeleteUserComponent} from '../super-admin-list/super-admin-list.component';
import {MatDialog} from '@angular/material';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  admins: User[];
  ad = new User();
  rank: number;
  jwthelper = new JwtHelperService();
  id: number;
  constructor(
    private AdService: AdminService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getlist();
    this.rank = this.jwthelper.decodeToken(window.localStorage.getItem('token')).rank;
    this.id = this.jwthelper.decodeToken(window.localStorage.getItem('token')).id;
  }
  getlist() {
    this.AdService.getlist().subscribe( resp => {
        console.log(resp);
        this.admins = resp;
      }, error => console.log(error)
    );
  }
  delAd(e: Event, index: number) {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log(e, 'onDEL');
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '250px',
      data: {Sure: false, Name: this.admins[index].Name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.Sure) {
        this.AdService.deleteAdmin(this.admins[index].ID).subscribe(resp => {
          console.log(resp);
          this.admins.splice(index, 1);
        }, error => console.log(error));
      }}, err => console.log(err));
  }
  createAd() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '250px',
      data: {Name: this.ad.Name, Email: this.ad.Email, Pass: this.ad.Pass}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.ad.Name = result.Name;
      this.ad.Email = result.Email;
      this.ad.Pass = result.Pass;
      this.AdService.createAdmin(this.ad).subscribe(
        resp => {
          console.log('resp: ', resp, 'this.ad: ', this.ad);
          this.ad.ID = resp.ID;
          this.admins.push(this.ad);
          console.log(this.admins);
        }
      );
    }, error => {console.log(error); });
  }
}
