import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/classes/client/client';
import { Hotel } from 'src/app/classes/hotel/hotel';
import { ClientService } from 'src/app/services/client/client.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { ResaService } from 'src/app/services/resa/resa.service';
import { timeOutMessage } from 'src/environments/environment';

@Component({
  selector: 'app-resas-details',
  templateUrl: './resas-details.component.html',
  styleUrls: ['./resas-details.component.css']
})
export class ResasDetailsComponent implements OnInit {

  resaForm = new FormGroup({
    id: new FormControl(""),
    datedeb: new FormControl("", Validators.required),
    datefin: new FormControl("", Validators.required),
    numChambre: new FormControl("", Validators.required),
    client: new FormControl(null, Validators.required),
    hotel: new FormControl(null, Validators.required)
  });;

  clients: Array<Client> = [];
  hotels: Array<Hotel> = [];
  errorMessage = "";

  showError(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = "";
    }, timeOutMessage)
  }

  constructor(private aRoute: ActivatedRoute, private resaService: ResaService, private router: Router, private clientService: ClientService, private hotelService: HotelService) {
    let resaId = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (resaId > 0) {
      this.resaService.getById(resaId).subscribe({
        next: (data) => { this.resaForm.setValue(data) },
        error: (err) => { this.showError(err.error.message) }
      })
    }
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loadAllHotel();
    this.loadAllClient();
  }

  loadAllHotel() {
    this.hotelService.getAll().subscribe({
      next: (data) => { this.hotels = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  loadAllClient() {
    this.clientService.getAll().subscribe({
      next: (data) => { this.clients = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  compareClient(c1?: Client, c2?: Client): boolean {
    return (c1?.id === c2?.id)
  }

  compareHotel(h1?: Hotel, h2?: Hotel): boolean {
    return (h1?.id === h2?.id)
  }

  goBack() {
    if (this.resaForm.controls['id']?.value == "")
      this.router.navigate(['resas'])
    else
      this.resetForm();
  }

  resetForm() {
    this.resaForm = new FormGroup({
      id: new FormControl(""),
      datedeb: new FormControl("", Validators.required),
      datefin: new FormControl("", Validators.required),
      numChambre: new FormControl("", Validators.required),
      client: new FormControl(null, Validators.required),
      hotel: new FormControl(null, Validators.required)
    });
  }

  submit() {
    let resa = this.resaForm.value;
    let obs: Observable<any>;
    if (resa.id == undefined || resa.id == "" || resa.id == 0) {
      obs = this.resaService.add(resa);
    } else {
      obs = this.resaService.update(resa);
    }

    obs.subscribe({
      next: (data) => {
        this.resetForm();
        this.router.navigate(['resas'])
      },
      error: (err) => {
        this.showError(err.error.message)
      }
    })
  }

}
