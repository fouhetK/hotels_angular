import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../guard/in/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public auth: AuthGuard) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.removeItem("connected");
    sessionStorage.removeItem("user");
    this.router.navigate(['login'])
  }

}
