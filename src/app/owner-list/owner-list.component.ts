import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {User} from '../user';
import {CreateUserComponent, DeleteUserComponent} from '../super-admin-list/super-admin-list.component';
import {MatDialog} from '@angular/material';
import {JwtHelperService} from '@auth0/angular-jwt';
import {OwnerService} from '../owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: User[];
  owner = new User();
  rank: number;
  jwthelper = new JwtHelperService();
  id: number;
  constructor(
    private ownerService: OwnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getlist();
    this.rank = this.jwthelper.decodeToken(window.localStorage.getItem('token')).rank;
    this.id = this.jwthelper.decodeToken(window.localStorage.getItem('token')).id;
  }
  getlist() {
    this.ownerService.getlist().subscribe( resp => {
        console.log(resp);
        this.owners = resp;
      }, error => console.log(error)
    );
  }
  delOwner(e: Event, index: number) {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log(e, 'onDEL');
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '250px',
      data: {Sure: false, Name: this.owners[index].Name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.Sure) {
        this.ownerService.deleteOwner(this.owners[index].ID).subscribe(resp => {
          console.log(resp);
          this.owners.splice(index, 1);
        }, error => console.log(error));
      }}, err => console.log(err));
  }
  createOwner() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '250px',
      data: {Name: this.owner.Name, Email: this.owner.Email, Pass: this.owner.Pass}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.owner.Name = result.Name;
      this.owner.Email = result.Email;
      this.owner.Pass = result.Pass;
      this.ownerService.createOwner(this.owner).subscribe(
        resp => {
          console.log('resp: ', resp, 'this.owner: ', this.owner);
          this.owner.ID = resp.ID;
          this.owner.Adder = this.id;
          this.owner.AdderRole = this.rank;
          this.owners.push(this.owner);
          console.log(this.owners);
        }
      );
    }, error => {console.log(error); });
  }
}
