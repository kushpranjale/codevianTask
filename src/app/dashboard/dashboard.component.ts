import { ImageUploadService } from './../Services/image-upload.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Lightbox } from 'ngx-lightbox';

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

  constructor(
    private modalService: NgbModal,
    private imageService: ImageUploadService,
    private _lightbox: Lightbox
  ) {}

  ngOnInit(): void {
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
    });
  }
  addFile(event: any, content) {
    this.imageChangedEvent = event;
    this.modalService.open(content, { size: 'xl' });
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    this.newEvent = event;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  addImage() {
    let fd = new FormData();
    let fileToReturn = this.base64ToFile(
      this.croppedImage,
      this.imageChangedEvent.target.files[0].name
    );
    // var blob = this.dataURItoBlob(this.croppedImage);

    // let image = <File>this.newEvent.target.files;
    fd.append('image', fileToReturn);
    this.imageService.addImage(fd);
  }
  base64ToFile(data, filename) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
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
