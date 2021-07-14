import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  url = 'https://fringuante-vin-58071.herokuapp.com/api/addImage';
  updatedData = new Subject();

  constructor(private http: HttpClient) {}
  listener() {
    return this.updatedData.asObservable();
  }
  addImage(file: any) {
    this.http.post(this.url, file).subscribe((response) => {
      console.log(response);
      this.updatedData.next();
    });
  }
  getAllImage() {
    return this.http.get(
      'https://fringuante-vin-58071.herokuapp.com/api/getAllImage'
    );
  }
  deleteImage(id: string) {
    let data = {
      id: id,
    };
    this.http
      .post('https://fringuante-vin-58071.herokuapp.com/api/deleteImage', data)
      .subscribe((res) => {
        this.updatedData.next();
      });
  }
}
