import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-front-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private state: string;
  private links = ['Login'];
  private background = 'primary';
  private activeLink = this.links[0];
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['']);
    }
    this.state = this.links[0];
    // this.addActive();
  }

  toggle(link: string) {
    // this.removeActive();
    this.state = link;
    this.activeLink = link;
    // this.addActive();
  }
  // addActive() {
  //   const x = document.getElementById(this.state);
  //   x.className = 'active';
  // }
  // removeActive() {
  //   const x = document.getElementById(this.state);
  //   x.className = '';
  // }
}
