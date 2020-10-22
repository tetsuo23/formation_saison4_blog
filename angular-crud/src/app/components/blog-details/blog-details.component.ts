import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  currentBlog = null;
  message = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getBlog(this.route.snapshot.paramMap.get('id'));
  }

  getBlog(id): void {
    this.blogService.get(id)
      .subscribe(
        data => {
          this.currentBlog = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentBlog.title,
      description: this.currentBlog.description,
      published: status
    };

    this.blogService.update(this.currentBlog.id, data)
      .subscribe(
        response => {
          this.currentBlog.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateBlog(): void {
    this.blogService.update(this.currentBlog.id, this.currentBlog)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Mise à jour réussie !';
        },
        error => {
          console.log(error);
        });
  }

  deleteBlog(): void {
    this.blogService.delete(this.currentBlog.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/blogs']);
        },
        error => {
          console.log(error);
        });
  }
}
