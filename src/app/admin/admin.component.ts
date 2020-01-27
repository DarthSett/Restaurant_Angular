import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SuperAdminService} from '../super-admin.service';
import {User} from '../user';
import {CreateUserComponent, DeleteUserComponent} from '../super-admin-list/super-admin-list.component';
import {MatDialog} from '@angular/material';
import {AdminService} from '../admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  ad = new User();
  rank: number;
  jwthelper = new JwtHelperService();
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AdService: AdminService,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.getAd();
    this.rank = this.jwthelper.decodeToken(window.localStorage.getItem('token')).rank;
    this.id = this.jwthelper.decodeToken(window.localStorage.getItem('token')).id;
  }

  delAd() {
    // console.log(e, 'onDEL');
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '250px',
      data: {Sure: false, Name: this.ad.Name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.Sure) {
        this.AdService.deleteAdmin(this.ad.ID).subscribe(resp => {
          console.log(resp);
          this.router.navigate(['admin']);
        }, error => console.log(error));
      }}, err => console.log(err));
  }
  getAd() {
    const id = this.route.snapshot.paramMap.get('id');
    this.AdService.getAdmin(id).subscribe(resp => {
      console.log(resp);
      this.ad = resp;
    } , error => console.log(error));
  }
  updateAd() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '250px',
      data: {Name: this.ad.Name, Email: this.ad.Email, Pass: this.ad.Pass}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result.ID = this.ad.ID;
      console.log(result);
      this.AdService.updateAdmin(result).subscribe(
        resp => {
          console.log(resp);
          this.ad.Name = result.Name;
          this.ad.Email = result.Email;
          console.log(this.ad);
        }
      );
    }, error => {console.log(error); });
  }
}

