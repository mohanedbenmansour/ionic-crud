import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostCrudService } from '../services/post-crud.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage  {
postForm:FormGroup;
currentImage;
  constructor(    private camera:Camera,
    private postService:PostCrudService,
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,

    ) { 

      this.postForm = this.formBuilder.group({
        title: [''],
        uploadTime: new Date().toISOString().slice(0, 10),
        content: [''],
        image: ['']
      })
    }

 onSubmit(){
  if (!this.postForm.valid) {
    return false;
  } else {
    const  today = new Date().toISOString().slice(0, 10)

    this.postService.createPost(this.postForm.value)
      .subscribe((response) => {
        this.zone.run(() => {
          this.postForm.reset();
          this.router.navigate(['/list']);
        })
      });
  }
 }

/*
async takepic(){ 
  const option:CameraOptions={
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  const imageData=await this.camera.getPicture(option);
  const base64Image = 'data:image/jpeg;base64,' + imageData;
  this.currentImage=base64Image;
}
*/
 
}
