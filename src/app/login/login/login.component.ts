import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Admin } from 'src/app/classes/admin/admin';
import { AuthGuard } from 'src/app/guard/in/auth.guard';
import { ConfigService } from 'src/app/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = ""
  password : string = ""

  constructor(private http : HttpClient, private router : Router, private app : AppComponent, private guard: AuthGuard
    , private config: ConfigService) { }

  ngOnInit(): void {
  }

  authenticate(){
    let u = {"username" : this.username , "password" : this.password }
    
    // http://localhost:8080/api/login
    this.http.post<Admin>( environment.backendUri + "login" , u ).subscribe(
      {
        next: (data) => {
          sessionStorage.setItem("connected" , "1" );
          sessionStorage.setItem("user" , JSON.stringify(data));
          this.app.user = data
          console.log(data)
          this.config.httpOptions = {
            headers : new HttpHeaders({
              'Authorization' : "Basic " + data.password 
            })
          }
          this.router.navigate(['hotels'])
        },
        error: (err) => { console.log(err.error.message) }
      }
    )
  }

}
