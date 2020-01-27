import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../user';
import {SuperAdminService} from '../super-admin.service';
// import {UpdateRestaurantComponent} from '../restaurant/restaurant.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
// import {Restaurant} from '../restaurant';

@Component({
  selector: 'app-super-admin-list',
  templateUrl: './super-admin-list.component.html',
  styleUrls: ['./super-admin-list.component.css']
})
export class SuperAdminListComponent implements OnInit {
  superadmins: User[];
  sa = new User();

  constructor(
    private SaService: SuperAdminService,
    private dialog: MatDialog
  ) {
  }
  delSA(e: Event, index: number) {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log(e, 'onDEL');
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '250px',
      data: {Sure: false, Name: this.superadmins[index].Name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.Sure) {
      this.SaService.deleteSA(this.superadmins[index].ID).subscribe(resp => {
        console.log(resp);
        this.superadmins.splice(index, 1);
      }, error => console.log(error));
      }}, err => console.log(err));
  }
  ngOnInit() {

    this.getsuperadmins();
  }
  getsuperadmins() {
    this.SaService.getlist().subscribe(resp => {
      console.log(resp);
      this.superadmins = resp;
    });
  }
  createSA() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '250px',
      data: {Name: this.sa.Name, Email: this.sa.Email, Pass: this.sa.Pass}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.sa.Name = result.Name;
      this.sa.Email = result.Email;
      this.sa.Pass = result.Pass;
      this.SaService.createSA(this.sa).subscribe(
        resp => {
          console.log('resp: ', resp, 'this.sa: ', this.sa);
          this.sa.ID = resp.ID;
          this.superadmins.push(this.sa);
          console.log(this.superadmins);
        }
      );
    }, error => {console.log(error); });
  }

}

@Component({
  selector: 'app-create-sa',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  ngOnInit() {
  }

}

@Component({
  selector: 'app-create-sa',
  templateUrl: './delete-user.component.html'
})
export class DeleteUserComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {Sure: boolean, Name: string}) {}

  ngOnInit() {
  }

}

