import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SuperAdminService} from '../super-admin.service';
import {User} from '../user';
import {DeleteUserComponent} from '../super-admin-list/super-admin-list.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  sa = new User();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private SaService: SuperAdminService,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.getSA();
  }

  delSA() {
    // console.log(e, 'onDEL');
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '250px',
      data: {Sure: false, Name: this.sa.Name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.Sure) {
        this.SaService.deleteSA(this.sa.ID).subscribe(resp => {
          console.log(resp);
          this.router.navigate(['superadmin']);
        }, error => console.log(error));
      }}, err => console.log(err));
  }
  getSA() {
    const id = this.route.snapshot.paramMap.get('id');
    this.SaService.getSA(id).subscribe(resp => {
      console.log(resp);
      this.sa = resp;
    } , error => console.log(error));
  }
}
