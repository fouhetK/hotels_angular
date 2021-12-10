import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/classes/hotel/hotel';
import { Image } from 'src/app/classes/image/image';
import { ConfigService } from 'src/app/services/config/config.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { ImageService } from 'src/app/services/image/image.service';
import { environment, timeOutMessage } from 'src/environments/environment';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  @ViewChild('fileInput') inputEl: ElementRef | undefined;
  @ViewChild('closebutton') closebuttonelement: any;

  imageForm = new FormGroup({
    id: new FormControl(""),
    description: new FormControl("", Validators.required),
    path: new FormControl(""),
    hotel: new FormControl("")
  });;
  errorMessage = ""
  hotel?: Hotel
  images?: Array<Image>
  success = false;

  showError(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = "";
    }, timeOutMessage)
  }

  showSuccess(): void {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, timeOutMessage)
  }

  constructor(private aRoute: ActivatedRoute, private http: HttpClient, private imageService: ImageService,
    private config: ConfigService, private hotelService: HotelService) {
    let hotelId = Number(this.aRoute.snapshot.paramMap.get('id'));
    this.hotelService.getById(hotelId).subscribe({
      next: (data) => {
        this.hotel = data;
        this.loadAllImage();
      },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  loadAllImage() {
    this.imageService.getAll(this.hotel?.id).subscribe({
      next: (data) => { this.images = data },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  resetImageForm() {
    this.imageForm = new FormGroup({
      id: new FormControl(""),
      description: new FormControl("", Validators.required),
      path: new FormControl(""),
      hotel: new FormControl("")
    });;
  }


  loadById(id: number) {
    this.imageService.getById(id).subscribe({
      next: (data) => { this.imageForm.setValue(data) },
      error: (err) => { this.showError(err.error.message) }
    })
  }

  setImageForm(id: number) {
    this.images?.forEach(
      image => {
        if (image.id == id) {
          this.imageForm.setValue(image);
          return;
        }
      }
    );
  }

  delete(id: number) {
    if (confirm("Êtes vous sur ?")) {
      this.imageService.delete(id).subscribe({
        next: (data) => { this.loadAllImage() },
        error: (err) => { this.showError(err.error.message) }
      })
    }
  }

  checkValide() {
    let inputEl: HTMLInputElement = this.inputEl?.nativeElement;

    if (inputEl != undefined && inputEl.files != undefined) {
      return this.imageForm.valid && inputEl.files.length > 0;
    }
    else
      return this.imageForm.valid;
  }

  submit() {
    let inputEl: HTMLInputElement = this.inputEl?.nativeElement;

    if (inputEl != undefined && inputEl.files != undefined && inputEl.files.length > 0) {

      let fileCount: number = inputEl.files.length;
      let formData = new FormData();
      let imageFormValue = this.imageForm.value;

      Object.keys(imageFormValue).forEach((key) => {
        formData.append(key, imageFormValue[key]);
      })

      if (formData.has("hotel"))
        formData.set("hotel", "" + this.hotel?.id);


      if (fileCount > 0) { // a file was selected  
        formData.append('image', inputEl.files[0]);
      }
      let o: Observable<any>;

      if (this.imageForm.get("id")?.value > 0) {
        o = this.http.put(environment.backendUri + "image/" + this.imageForm.get("id")?.value, formData, this.config.httpOptions);
      } else {
        o = this.http.post(environment.backendUri + "image", formData, this.config.httpOptions);
      }

      o.subscribe(
        {
          next: (data) => {
            this.loadAllImage();
            this.closebuttonelement.nativeElement.click();
          },
          error: (err) => { console.log(err.error.message) }
        }
      )

    }

  }

  ngOnInit(): void {
  }

}
