import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  url = 'http://localhost:8080/api/addImage';
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
    return this.http.get('http://localhost:8080/api/getAllImage');
  }
  deleteImage(id: string) {
    let data = {
      id: id,
    };
    this.http
      .post('http://localhost:8080/api/deleteImage', data)
      .subscribe((res) => {
        this.updatedData.next();
      });
  }
}
