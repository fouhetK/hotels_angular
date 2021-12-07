import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeOutMessage } from 'src/environments/environment';
import { Client } from '../classes/client/client';
import { Resa } from '../classes/resa/resa';
import { ClientService } from '../services/client/client.service';
import { ResaService } from '../services/resa/resa.service';

@Component({
  selector: 'app-resas',
  templateUrl: './resas.component.html',
  styleUrls: ['./resas.component.css']
})
export class ResasComponent implements OnInit {

  resas?:Array<Resa>;
  clients: Array<Client> = [];
  errorMessage = "";
  success: boolean = false;
  clientRecherche : number = 0

  constructor(private resaService:ResaService, private router:Router, private clientService:ClientService) { }

  ngOnInit(): void {
    this.loadAllResa();
    this.loadAllClient();
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

  loadAllResa(){
    this.resaService.getAll(this.clientRecherche).subscribe({
      next: (data) => { this.resas = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }
  
  loadAllClient(){
    this.clientService.getAll().subscribe({
      next: (data) => { this.clients = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  delete(id?:number){
    this.resaService.delete(id).subscribe({
      next: (data) => {
        this.loadAllResa();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) }
      
    })
  }

}
