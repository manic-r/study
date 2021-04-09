import { Component } from "@angular/core";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'demo-eu-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  URL: string = 'http://localhost:8081/file/test/upload';
  autoUpload: boolean = false;
  fileList: NzUploadFile[] = [];
  uploading: boolean = false;
  fileDir: string = '';
  splitStr: string = 'EU-SUPER-SPLIT-OF-FILE';

  constructor(private http: HttpClient) {

  }

  beforeUpload = (file: NzUploadFile | NzUploadFile[]) => {
    if (!this.autoUpload) {
      this.fileList = this.fileList.concat(file);
    }
    return this.autoUpload;
  }

  handleUpload() {
    const formData = new FormData();
    formData.append('fileDir', this.fileDir);
    this.fileList.filter(file => !file.status || file.status === 'error').forEach((file: any) => {
      formData.append('files', file);
    });
    console.log(formData.getAll('files'))
    const req = new HttpRequest('POST', this.URL, formData);
    this.http.request(req).pipe(filter(e => e instanceof HttpResponse))
      .toPromise()
      .then((res: any) => res.body)
      .then(res => console.log(res));
  }

  watch = () => {
    console.log(this.fileList)
  }
}
