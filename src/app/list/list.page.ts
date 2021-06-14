import { Component, OnInit } from '@angular/core';
import { PostCrudService } from '../services/post-crud.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  posts: any = [];

  constructor( private postService: PostCrudService ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.postService.getPosts().subscribe((response) => {
      this.posts = response;
    })
  }

  removePost(post, i) {
    if (window.confirm('Are you sure')) {
      this.postService.deletePost(post._id)
      .subscribe(() => {
          this.posts.splice(i, 1);
          console.log('post deleted!')
         
        }
      )
    }
  }

}
