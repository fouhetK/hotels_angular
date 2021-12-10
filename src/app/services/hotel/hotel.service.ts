import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/classes/hotel/hotel';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  serviceUri : string = "hotel";

  constructor( private http : HttpClient , private config : ConfigService) { }

  getAll() : Observable<Hotel[]>{
    return this.http.get<Hotel[]>(environment.backendUri + this.serviceUri, this.config.httpOptions);
  }

  getById(id?:number) : Observable<Hotel>{
    return this.http.get<Hotel>(environment.backendUri + this.serviceUri + "/" + id, this.config.httpOptions);
  }

  add(hotel?:Hotel) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri, hotel, this.config.httpOptions);
  }

  update(hotel?:Hotel) : Observable<any>{
    return this.http.put(environment.backendUri + this.serviceUri + "/" + hotel?.id, hotel, this.config.httpOptions);
  }

  delete(id?:number) : Observable<any>{
    return this.http.delete(environment.backendUri + this.serviceUri+ "/" +id, this.config.httpOptions);
  }
}
