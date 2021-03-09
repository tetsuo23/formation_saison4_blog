import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { UploadService } from './../../services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs: any;
  currentBlog = null;
  currentIndex = -1;
  title = '';

  fileInfos: Observable<any>;
  selectedFiles: FileList;

  constructor(private blogService: BlogService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.retrieveBlogs();
    this.fileInfos = this.uploadService.getFiles();
  }

  retrieveBlogs(): void {
    this.blogService.getAll()
      .subscribe(
        data => {
          this.blogs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveBlogs();
    this.currentBlog = null;
    this.currentIndex = -1;
  }

  setActiveBlog(blog, index): void {
    this.currentBlog = blog;
    this.currentIndex = index;
  }

  removeAllBlogs(): void {
    this.blogService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.blogService.findByTitle(this.title)
      .subscribe(
        data => {
          this.blogs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
}
