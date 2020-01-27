import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {range} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent implements OnInit {
  private background = 'primary';
  private links = ['Restaurants'];
  private activeLink: string;
  private rank: number;
  jwtHelper = new JwtHelperService();
  ngOnInit() {
    console.log(this.route.snapshot.children[0].url[0].path);
    if (this.route.snapshot.children[0].url[0].path === 'rest') {
      this.activeLink = 'Restaurants';
    } else if (this.route.snapshot.children[0].url[0].path === 'superadmin') {
      this.activeLink = 'Super Admins';
    } else if (this.route.snapshot.children[0].url[0].path === 'admin') {
      this.activeLink = 'Admins';
    } else if (this.route.snapshot.children[0].url[0].path === 'user') {
      this.activeLink = 'Owners';
    }
    this.rank = this.jwtHelper.decodeToken(window.localStorage.getItem('token')).rank;
    this.getlinks();
    console.log(this.rank, this.links);
    // this.activeLink =
  }


  public Logout() {
    window.localStorage.clear();
    this.router.navigate(['/home']);
  }


  public getlinks() {
    // tslint:disable-next-line:triple-equals
    // tslint:disable-next-line:triple-equals
    if (this.rank == 1) {
      this.links.push('Owners');
      this.links.push('Admins');
    }
    // tslint:disable-next-line:triple-equals
    if (this.rank == 2) {
      this.links.push('Owners');
      this.links.push('Admins');
      this.links.push('Super Admins');
    }
  }

  public toggle(link) {
    this.activeLink = link;
    if (link === 'Restaurants') {
      this.router.navigate(['/rest']);
    }
    if (link === 'Super Admins') {
      this.router.navigate(['/superadmin']);
    }
    if (link === 'Admins') {
      this.router.navigate(['/admin']);
    }
    if (link === 'Owners') {
      this.router.navigate(['/owner']);
    }
  }

  constructor(
      private router: Router,
      private route: ActivatedRoute,
  ) { }



}
