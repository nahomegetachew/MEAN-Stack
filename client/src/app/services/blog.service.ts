import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  options;
  doamin = this.authService.domain;


  constructor(
    private authService: AuthService,
    private http: Http,
  ) { }


  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    })
  }
  newBlog(blog){
    this.createAuthenticationHeaders();
    return this.http.post(this.doamin + 'blogs/newblog',blog,this.options).map(res=> res.json());
  }
  getAllBlogs(){
    this.createAuthenticationHeaders();
    return this.http.get(this.doamin + 'blogs/allblogs',this.options).map(res=>res.json());
  }
  getSingleBlog(id){
    this.createAuthenticationHeaders();
    return this.http.get(this.doamin + 'blogs/singleblog/' + id,this.options).map(res => res.json());
  }
  editBlog(blog){
    this.createAuthenticationHeaders();
    return this.http.put(this.doamin + 'blogs/updateblog/',blog,this.options).map(res=> res.json());
  }
  deleteBlog(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.doamin + 'blogs/deletblog/' + id,this.options).map(res=>res.json());
  }
}
