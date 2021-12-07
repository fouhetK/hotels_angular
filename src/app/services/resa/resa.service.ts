import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resa } from 'src/app/classes/resa/resa';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ResaService {

  serviceUri : string = "resa";

  constructor( private http : HttpClient , private config : ConfigService) { }

  getAll(searchValue?:number) : Observable<Resa[]>{
    return this.http.get<Resa[]>(environment.backendUri + this.serviceUri + (searchValue != undefined ? "?client=" + searchValue : ""), this.config.httpOptions);
  }

  getById(id?:number) : Observable<Resa>{
    return this.http.get<Resa>(environment.backendUri + this.serviceUri + "/" + id, this.config.httpOptions);
  }

  add(resa?:Resa) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri, resa, this.config.httpOptions);
  }

  update(resa?:Resa) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri + "/" + resa?.id, resa, this.config.httpOptions);
  }

  delete(id?:number) : Observable<any>{
    return this.http.delete(environment.backendUri + this.serviceUri+id, this.config.httpOptions);
  }
}
