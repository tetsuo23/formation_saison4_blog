import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

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

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.retrieveBlogs();
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
