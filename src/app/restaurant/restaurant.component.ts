import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Restaurant} from '../restaurant';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../restaurant.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatDialog, MAT_DIALOG_DATA, MatTable} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {Food} from '../food';
import {FoodService} from '../food-service.service';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @ViewChild('table', {static: true}) table: MatTable<Element>;
  displayedColumns: string[] = ['Id', 'Name', 'Price'];
  jwtHelper = new JwtHelperService();
  rest = new Restaurant();
  rank: number;
  ID: number;
  Email: string;
  rid: string;
  selection = new SelectionModel<Food>(true, []);

  constructor(
    private FdService: FoodService,
    private RestService: RestaurantService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) { }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.rest.Menu.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection && this.selection.selected.length;
    const numRows = this.rest.Menu && this.rest.Menu.length;
    return numSelected === numRows;
  }

  ngOnInit() {
    this.rid = this.route.snapshot.paramMap.get('id');
    this.getRest(this.rid);
    this.rank = this.jwtHelper.decodeToken(window.localStorage.getItem('token')).rank;
    this.ID = this.jwtHelper.decodeToken(window.localStorage.getItem('token')).id;
    this.Email = this.jwtHelper.decodeToken(window.localStorage.getItem('token')).email;
  }

  getRest(rid: string) {

    this.RestService.getRest(rid).subscribe(
      rest => {
        console.log(rest);
        this.rest = rest.Restaurant;
        this.rest.Menu = rest.Menu;
        console.log(this.rank, this.ID, this.rest, this.Email);
        if ((this.rank === 1 && this.ID.toString() === this.rest.AddedBy && this.rest.AdderRole === '1') ||
          (this.rank === 0 && this.Email === this.rest.Owner) ||
          (this.rank === 2)) {
          this.displayedColumns = ['select', 'Id', 'Name', 'Price', 'Edit'];
          console.log(this.rank, this.displayedColumns);
        }
      }
    );
  }

  checkboxLabel(row?: Food): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.rest.Menu.indexOf(row) + 1}`;
  }

  openEditRestDialog() {
    const dialogRef = this.dialog.open(UpdateRestaurantComponent, {
      width: '250px',
      data: {Name: this.rest.Name, Tables: this.rest.Tables, Lat: this.rest.Lat, Long: this.rest.Long, Owner: this.rest.Owner}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.Name)  {this.rest.Name = result.Name; }
      if (result.Tables) { this.rest.Tables = Number(result.Tables); }
      if (result.Lat) { this.rest.Lat = result.Lat; }
      if (result.Long) { this.rest.Long = result.Long; }
      if (result.Owner) { this.rest.Owner = result.Owner; }
      this.RestService.updateRest(this.rest).subscribe(resp => console.log(resp), err => console.log(err));
    });
  }

  openEditFoodDialog(product: any) {
    // @ts-ignore
    console.log(product);
    const dialogRef = this.dialog.open(UpdateFoodComponent, {
      width: '250px',
      data: {Name: product.Name, Price: product.Price, ID: product.Id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.rest.Menu);
      console.log('The dialog was closed');
      console.log(product, result);
      if (result.Name)  {product.Name = result.Name; }
      if (result.Price) { product.Price = Number(result.Price); }
      product.ID = Number(result.ID);
      console.log(result);
      console.log(product.ID);
      product.RID = this.rest.ID;
      this.FdService.updateFood(product).subscribe(resp => console.log(resp), err => console.log(err));
    });
  }

  openAddFoodDialog(product= new Food()) {
    const dialogRef = this.dialog.open(UpdateFoodComponent, {
      width: '250px',
      data: {Name: product.Name, Price: product.Price }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.Name && result.Price)  {
        product.Name = result.Name;
        product.Price = Number(result.Price);
        product.Id = 0;
        product.RID = this.rest.ID;
        this.FdService.createFood(product).subscribe(resp => {
          console.log(resp);
          product.Id = resp.Id;
          console.log(product);
          console.log(this.rest.Menu);
          this.rest.Menu.push(product);
          console.log(this.rest.Menu);
          this.table.renderRows();
        }, err => console.log(err));
      } else {
        console.log('No input from owner.');
      }
    });
  }

  delFood() {
    const dialogRef = this.dialog.open(DeleteRestaurantComponent, {
      width: '250px',
      data: {Name: this.rest.Name, Sure: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('rid: ' + rid);
      if (result.Sure) {
        this.selection.selected.forEach(
          food => {
            this.FdService.deleteFood(food.Id).subscribe(
              rest => {
                console.log(rest);
                this.getRest(this.rid);
                this.table.renderRows();
                // this.router.navigate(['']);
              }, error => {
                console.log(error);
              });
          }
        );
      }
    });
  }

  delRest(rid: string) {
    const dialogRef = this.dialog.open(DeleteRestaurantComponent, {
      width: '250px',
      data: {Name: this.rest.Name, Sure: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('rid: ' + rid);
      if (result.Sure) {
        this.RestService.deleteRest(rid).subscribe(
          rest => {
            console.log(rest);
            this.router.navigate(['']);
          }, error => {
            console.log(error);
          });
        Number('1234');
      }
    });
  }

}

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html'
})
export class UpdateRestaurantComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Restaurant) {}

  ngOnInit() {
  }

}


@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html'
})
export class UpdateFoodComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Food) {}

  ngOnInit() {
  }

}


@Component({
  selector: 'app-delete-restaurant',
  templateUrl: './delete-restaurant.component.html'
})
export class DeleteRestaurantComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {Name: string, Sure: boolean}) {}

  ngOnInit() {
  }

}
// todo:Resolve the server side application of update rest (remove the flag variable)
