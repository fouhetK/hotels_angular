import { Component, OnInit } from '@angular/core';
import { timeOutMessage } from 'src/environments/environment';
import { Client } from '../classes/client/client';
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients ?: Array<Client>;
  errorMessage = "";
  success: boolean = false;

  constructor(private clientsService: ClientService) { }

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

  loadAll(){
    this.clientsService.getAll().subscribe({
      next: (data) => { this.clients = data },
      error: (err) => { this.errorMessage = err.error.message }
    })
  }

  delete(id:number){
    this.clientsService.delete(id).subscribe({
      next: (data) => {
        this.loadAll();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) }
      
    })
  }

}
