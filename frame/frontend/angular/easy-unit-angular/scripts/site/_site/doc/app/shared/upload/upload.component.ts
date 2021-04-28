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

  URL: string = 'http://localhost:42000/file/upload';
  splitStr: string = 'EU-SUPER-SPLIT-OF-FILE';

  autoUpload: boolean = false;
  uploadDirectory: boolean = false;

  fileList: NzUploadFile[] = [];
  uploading: boolean = false;

  // 服务器相关
  fileDir: string = '';
  deleteAll: boolean = false;
  backupAll: boolean = false;
  lastBackup: boolean = false;

  constructor(private http: HttpClient) {}

  beforeUpload = (file: NzUploadFile | NzUploadFile[]) => {
    // file.webkitRelativePath 检测这个字段是否一致
    this.fileList = this.fileList.concat(file);
    return this.autoUpload;
  }

  handleUpload = () => {
    const formData = new FormData();
    formData.append('fileDir', this.fileDir);
    formData.append('deleteAll', this.deleteAll ? '1': '0');
    formData.append('backupAll', this.backupAll ? '1' : '0');
    formData.append('lastBackup', this.lastBackup ? '1' : '0');
    this.fileList.filter(file => !file.status || file.status === 'error').forEach((file: any) => {
      formData.append('files', file);
    });
    const req = new HttpRequest('POST', this.URL, formData);
    this.http.request(req).pipe(filter(e => e instanceof HttpResponse))
      .toPromise()
      .then((res: any) => res.body)
      .then(res => console.log(res));
  }

  deleteAllFunc = (event: boolean) => {
    if (event) {
      this.autoUpload = false;
      this.backupAll = false;
      this.lastBackup = false;
    }
  }

  backupAllFunc = (event: boolean) => {
    if (event) {
      this.autoUpload = false;
      this.deleteAll = false;
      this.lastBackup = false;
    }
  }

  lastBackupFunc = (event: boolean) => {
    if (event) {
      this.autoUpload = false;
      this.deleteAll = false;
      this.backupAll = false;
    }
  }
}
