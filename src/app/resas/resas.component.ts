import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeOutMessage } from 'src/environments/environment';
import { Resa } from '../classes/resa/resa';
import { ResaService } from '../services/resa/resa.service';

@Component({
  selector: 'app-resas',
  templateUrl: './resas.component.html',
  styleUrls: ['./resas.component.css']
})
export class ResasComponent implements OnInit {

  resas?:Array<Resa>;
  errorMessage = "";
  success: boolean = false;
  searchVar :string = "";

  constructor(private resaService:ResaService, private router:Router) { }

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

  search(){

  }

  loadAll(){
    this.resaService.getAll().subscribe({
      next: (data) => { this.resas = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  delete(id?:number){
    this.resaService.delete(id).subscribe({
      next: (data) => {
        this.loadAll();
        this.showSuccess();
      },
      error: (err) => { this.showError(err.error.message) }
      
    })
  }

}
