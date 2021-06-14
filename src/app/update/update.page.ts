import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCrudService } from '../services/post-crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  postForm: FormGroup;
  id: any;

  constructor(
    private userCrudService: PostCrudService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
   this.postForm = this.formBuilder.group({
      title: [''],
      content: [''],
      uploadTime:new Date().toISOString().slice(0, 10),
    })
  }

  ngOnInit() { 
   // this.fetchPost(this.id);
   
  }
  fetchPost(id) {
    this.userCrudService.getPost(id).subscribe((data) => {
      this.postForm.setValue({
        title: data['title'],
        content: data['content'],
        uploadTime: data['uploadTime']
      });
    });
  }
  onSubmit() {
    if (!this.postForm.valid) {
      return false;
    } else {
      this.userCrudService.updatePost(this.postForm.value,this.id)
        .subscribe(() => {
          this.postForm.reset();
          this.router.navigate(['/list']);
        })
    }
  }

}
