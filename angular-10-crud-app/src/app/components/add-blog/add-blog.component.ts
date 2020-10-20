import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  blog = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
  }

  saveBlog(): void {
    const data = {
      title: this.blog.title,
      description: this.blog.description
    };

    this.blogService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newBlog(): void {
    this.submitted = false;
    this.blog = {
      title: '',
      description: '',
      published: false
    };
  }

}
