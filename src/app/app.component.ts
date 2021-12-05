import { Component } from '@angular/core';
import { Admin } from './classes/admin/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hotels';
  
  user : Admin = new Admin();
}
