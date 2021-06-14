import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


export class Post {
  _id: number;
  title: string;
  uploadTime: string;
  content: string;
  image: String;
}
@Injectable({
  providedIn: 'root'
})

export class PostCrudService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  createPost(post: Post): Observable<any> {
    
    return this.httpClient.post<Post>('http://localhost:3000/post/new', post, this.httpOptions)
      .pipe(
        catchError(this.handleError<Post>('Error occured'))
      );
  }
  getPost(id): Observable<Post[]> {
    return this.httpClient.get<Post[]>('http://localhost:3000/post/fetch-post?id=' + id)
      .pipe(
        tap(_ => console.log(`Post fetched: ${id}`)),
        catchError(this.handleError<Post[]>(`Get post id=${id}`))
      );
  }
  getPosts(): Observable<Post[]> {

    return this.httpClient.get<Post[]>('http://localhost:3000/post/all')
      .pipe(
        tap(users => console.log('posts retrieved!')),
        catchError(this.handleError<Post[]>('Get Post', []))
      );
  }
  deletePost(id): Observable<Post[]> {
    return this.httpClient.delete<Post[]>('http://localhost:3000/post/delete/?id=' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`post deleted: ${id}`)),
        catchError(this.handleError<Post[]>('Delete post'))
      );
  }
  updatePost(post: Post,id): Observable<Post[]> {

    return  this.httpClient.put<Post[]>('http://localhost:3000/post/update/?id=' + id, post, this.httpOptions)
    .pipe(
      tap(_ => console.log(`post updated: ${id}`)),
      catchError(this.handleError<Post[]>('Update Post'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 
}
