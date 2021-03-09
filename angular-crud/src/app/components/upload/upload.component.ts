import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event): void {
    // this.selectedFiles = event.target.files;
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;
  
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }
  
    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }

  // upload(): void {
  //   this.progress = 0;

  //   this.currentFile = this.selectedFiles.item(0);
  //   this.uploadService.upload(this.currentFile).subscribe(
  //     event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         this.message = event.body.message;
  //         this.fileInfos = this.uploadService.getFiles();
  //       }
  //     },
  //     err => {
  //       this.progress = 0;
  //       this.message = 'Echec du chargement!';
  //       this.currentFile = undefined;
  //     });

  //   this.selectedFiles = undefined;
  // }
  uploadFiles(): void {
    this.message = '';
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(idx, file): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }
}


