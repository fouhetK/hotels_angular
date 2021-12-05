import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/classes/client/client';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  serviceUri : string = "client";

  constructor( private http : HttpClient , private config : ConfigService) { }

  getAll() : Observable<Client[]>{
    return this.http.get<Client[]>(environment.backendUri + this.serviceUri, this.config.httpOptions);
  }

  getById(id?:number) : Observable<Client>{
    return this.http.get<Client>(environment.backendUri + this.serviceUri + "/" + id, this.config.httpOptions);
  }

  add(client?:Client) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri, client, this.config.httpOptions);
  }

  update(client?:Client) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri + "/" + client?.id, client, this.config.httpOptions);
  }

  delete(id?:number) : Observable<any>{
    return this.http.delete(environment.backendUri + this.serviceUri+id, this.config.httpOptions);
  }

}
