import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resa } from 'src/app/classes/resa/resa';
import { ClientService } from 'src/app/services/client/client.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { ResaService } from 'src/app/services/resa/resa.service';
import { timeOutMessage } from 'src/environments/environment';

@Component({
  selector: 'app-bon',
  templateUrl: './bon.component.html',
  styleUrls: ['./bon.component.css']
})
export class BonComponent implements OnInit {

resa ?: Resa;
errorMessage = "";

showError(msg: string) {
  this.errorMessage = msg;
  setTimeout(() => {
    this.errorMessage = "";
  }, timeOutMessage)
}

getNbrDay(){
  let dateStart : Date = (this.resa?.datedeb == undefined) ? new Date() : new Date(this.resa?.datedeb);
  let dateEnd : Date = (this.resa?.datefin == undefined) ? new Date() : new Date(this.resa?.datefin);

  return Math.ceil((dateEnd.getTime() - dateStart.getTime()) / (1000*3600*24))
}

  constructor(private aRoute: ActivatedRoute, private resaService: ResaService, private router: Router, private clientService: ClientService, private hotelService: HotelService) {
    let resaId = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (resaId > 0) {
      this.resaService.getById(resaId).subscribe({
        next: (data) => { this.resa = data },
        error: (err) => { this.showError(err.error.message) }
      })
    }
  }

  ngOnInit(): void {
  }

}
