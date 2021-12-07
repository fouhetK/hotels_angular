import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MOBILE_PATERN, EMAIL_PATERN, timeOutMessage } from 'src/environments/environment';
import { Hotel } from '../classes/hotel/hotel';
import { HotelService } from '../services/hotel/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotelForm = new FormGroup({
    id : new FormControl(""),
    nom : new FormControl(""  , Validators.required ),
    etoiles : new FormControl(""  , Validators.required ),
    adresse : new FormControl( "", Validators.required),
    telephone : new FormControl(""  , [Validators.pattern(MOBILE_PATERN)]),
    email : new FormControl( "", [Validators.pattern(EMAIL_PATERN)]),
    ville : new FormControl( "", Validators.required)
  });

  hotels ?: Array<Hotel>;
  errorMessage = "";
  success: boolean = false;
  @ViewChild('closebutton') closebuttonelement: any;

  constructor(private hotelService: HotelService, private router: Router) { }

  ngOnInit(): void {
    this.loadAll();
  }

  showSuccess(): void {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, timeOutMessage)
  }

  showError(msg:string){
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = "";
    }, timeOutMessage)
  }

  resetForm(){
    this.hotelForm = new FormGroup({
      id : new FormControl(""),
      nom : new FormControl(""  , Validators.required ),
      etoiles : new FormControl(""  , Validators.required ),
      adresse : new FormControl( "", Validators.required),
      telephone : new FormControl(""  , [Validators.pattern(MOBILE_PATERN)]),
      email : new FormControl( "", [Validators.pattern(EMAIL_PATERN)]),
      ville : new FormControl( "", Validators.required)
    });
  }

  loadAll(){
    this.hotelService.getAll().subscribe({
      next: (data) => { this.hotels = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  loadById(id : number){
    this.hotelService.getById(id).subscribe({
      next: (data) => { this.hotelForm.setValue(data) },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  delete(id:number){
    this.hotelService.delete(id).subscribe({
      next: (data) => {
        this.loadAll();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  submit(){
    let client = this.hotelForm.value;
    let obs: Observable<any>;
    if (client.id == undefined || client.id == "" || client.id == 0){
      obs = this.hotelService.add(client);
    } else {
      obs = this.hotelService.update(client);
    }

    obs.subscribe({
      next: (data) => {
        this.loadAll();
        this.closebuttonelement.nativeElement.click();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }

}
