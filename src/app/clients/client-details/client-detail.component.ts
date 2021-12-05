import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { EMAIL_PATERN, MOBILE_PATERN, timeOutMessage } from 'src/environments/environment';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  clientForm = new FormGroup({
    id : new FormControl(""),
    nomComplet : new FormControl(""  , Validators.required ),
    telephone : new FormControl(""  , [Validators.pattern(MOBILE_PATERN)]),
    email : new FormControl( "", [Validators.pattern(EMAIL_PATERN)]),
    adresse : new FormControl( "", Validators.required)
  });
  
  errorMessage = "";

  showError(msg:string){
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = "";
    }, timeOutMessage)
  }

  goBack(){
    this.router.navigate(['resas'])
  }

  resetForm(){
    this.clientForm = new FormGroup({
      id : new FormControl(""),
      nomComplet : new FormControl(""  , Validators.required ),
      telephone : new FormControl(""  , [Validators.pattern(MOBILE_PATERN)]),
      email : new FormControl( "", [Validators.pattern(EMAIL_PATERN)]),
      adresse : new FormControl( "", Validators.required)
    });
  }

  constructor(private aRoute: ActivatedRoute, private clientService:ClientService, private router:Router) {
    let clientId = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (clientId > 0) {
      this.clientService.getById(clientId).subscribe({
        next: (data) => { this.clientForm.setValue(data) },
        error: (err) => { this.showError(err.error.message) }
      })
    }
   }

  ngOnInit(): void {
  }

  submit(){
    let client = this.clientForm.value;
    let obs: Observable<any>;
    if (client.id == undefined || client.id == "" || client.id == 0){
      obs = this.clientService.add(client);
    } else {
      obs = this.clientService.update(client);
    }

    obs.subscribe({
      next: (data) => {
        this.clientForm.reset();
        this.router.navigate(['clients'])
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }

}
