import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { Component } from "@angular/core";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'demo-eu-more-upload',
  templateUrl: './more-upload.component.html',
  styleUrls: ['./more-upload.component.scss']
})
export class MoreUploadComponent {
  uploading = false;
  fileList: NzUploadFile[] = [];

  constructor(private http: HttpClient) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('files', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', '/file/upload', formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          alert('upload successfully.');
        },
        () => {
          this.uploading = false;
          alert('upload failed.');
        }
      );
  }
}
