import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { Ng2ImgMaxModule } from 'ng2-img-max';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageCropperModule,
    NgbModule,
    HttpClientModule,
    LightboxModule,
    Ng2ImgMaxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
