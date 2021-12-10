import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/classes/image/image';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  serviceUri : string = "image";

  constructor( private http : HttpClient , private config : ConfigService) { }

  getAll(searchValue?:number) : Observable<Image[]>{
    return this.http.get<Image[]>(environment.backendUri + this.serviceUri + (searchValue != undefined ? "?hotel=" + searchValue : ""), this.config.httpOptions);
  }

  getById(id?:number) : Observable<Image>{
    return this.http.get<Image>(environment.backendUri + this.serviceUri + "/" + id, this.config.httpOptions);
  }

  add(image?:Image) : Observable<any>{
    return this.http.post(environment.backendUri + this.serviceUri, image, this.config.httpOptions);
  }

  update(image?:Image) : Observable<any>{
    return this.http.put(environment.backendUri + this.serviceUri + "/" + image?.id, image, this.config.httpOptions);
  }

  delete(id?:number) : Observable<any>{
    return this.http.delete(environment.backendUri + this.serviceUri+ "/" +id, this.config.httpOptions);
  }
}
