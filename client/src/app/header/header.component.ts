import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  email: string;




  constructor(
    private service: ManagerService
    , private router: Router
  ) { }

  ngOnInit(): void {
    //this.getLoggedUser();
  }
  getLoggedUser() {
    if (!this.service.isloggedin)
      return false;
    this.email = this.service.email;
    return true;

  }


  logOut() {
    this.service.getLogOut().then(json => {
      this.router.navigate(['/login']);
    });
  }
}
