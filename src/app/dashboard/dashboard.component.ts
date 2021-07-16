import { ImageUploadService } from './../Services/image-upload.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Lightbox } from 'ngx-lightbox';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  newEvent: any;
  album: any = [];
  id: string;
  uploadedImage: Blob;
  lessCount: number = 0;
  loadingStatus = false;

  constructor(
    private modalService: NgbModal,
    private imageService: ImageUploadService,
    private _lightbox: Lightbox,
    private ng2ImgMax: Ng2ImgMaxService
  ) {}

  ngOnInit(): void {
    this.loadingStatus = true;
    this.getData();
    this.imageService.listener().subscribe(() => {
      window.location.reload();
    });
  }
  getData() {
    this.imageService.getAllImage().subscribe((result: any) => {
      console.log(result);
      result.forEach((element) => {
        const src = element.image_url;
        const caption = element.file_name;
        const thumb = element.image_url;
        const id = element._id;
        const album = {
          src: src,
          caption: caption,
          thumb: thumb,
          id: id,
        };

        this.album.push(album);
      });
      this.loadingStatus = false;
    });
  }
  addFile(event: any) {
    // this.modalService.open(content, { size: 'xl' });
    var selectedFiles = event.target.files;
    console.log(selectedFiles.length);

    for (let i = 0; selectedFiles.length > i; i++) {
      const uploadData = new FormData();

      console.log(selectedFiles[i]['size']);
      if (selectedFiles[i]['size'] <= 50000) {
        this.lessCount++;
        return;
      }
      if (selectedFiles[i]['size'] > 1000000) {
        this.ng2ImgMax.compressImage(selectedFiles[i], 0.099).subscribe(
          (result) => {
            this.uploadedImage = new File([result], result.name);
            var file = new File([this.uploadedImage], selectedFiles[i].name);
            // this.getImagePreview(this.uploadedImage);
            uploadData.append('image', file);

            this.imageService.addImage(uploadData);
          },
          (error) => {
            console.log('😢 Oh no!', error);
          }
        );
      } else {
        uploadData.append('image', selectedFiles[i]);
        this.imageService.addImage(uploadData);
      }
    }
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  deleteBtn() {
    // console.log(id);
    this.imageService.deleteImage(this.id);
  }
  confirmDialog(del, id) {
    this.id = id;
    this.modalService.open(del);
  }
}
