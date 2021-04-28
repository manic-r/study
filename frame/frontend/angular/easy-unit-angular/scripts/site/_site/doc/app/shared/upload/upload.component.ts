import { Component, OnInit } from "@angular/core";
import { NzUploadFile } from "ng-zorro-antd/upload";
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

interface FileSaveResponse {
  filename: string;
  reName: string;
  status: 'SUCCESS' | 'ERROR';
}

interface SystemInfo {
  userName?: string;
  computerName?: string;
  userDomain?: string;
  ip4?: string;
  rootPath?: string;
}

export const ConfigInfo: {
  color: string,
  text: string,
  title: string,
  hightText?: string
}[] = [
  { 
    color: 'red',
    title: '批量上传',
    text: '开启后可以选择文件夹，将文件夹下所有文件进行提交，提交的保存数据结构与选中文件夹结构一致。',
    hightText: '大部分手机浏览器不支持h5，无法选择文件夹，建议手机访问关闭此功能。'
  },
  { 
    color: '#2db7f5',
    title: '自动提交',
    text: '开启后无需点击上传按钮，选中文件后自动上传。'
  },
  { 
    color: 'orange',
    title: '全部删除',
    text: '开启后会将服务器中根目录内容全部删除。',
    hightText: '【服务器配置】'
  },
  { 
    color: 'orange',
    title: '历史归类',
    text: '开启后会将服务器中根目录内容全部备份，统一存入一个文件夹（按照当天日期）【包括文件夹】。',
    hightText: '【服务器配置】'
  },
  { 
    color: 'orange',
    title: '备份文件',
    text: '开启后会将服务器中根目录内容部分备份，文件夹内非文件夹的文件到新的文件夹（按照时间戳备份）【不包括文件夹】。',
    hightText: '【服务器配置】'
  },
  { 
    color: 'orange',
    title: '文件夹名',
    text: '输入文件夹名称后会在服务器根目录中额外创建一个文件夹存储，你的文件将存在改文件夹下。',
    hightText: '【服务器配置】'
  },
  { 
    color: 'orange',
    title: '保留失败',
    text: '默认情况下提交后会清空当前上传列表，开启该功能会保留失败的文件在列表中不消除。'
  }
]

@Component({
  selector: 'demo-eu-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  URL: string = 'http://localhost:42001/file/upload';
  splitStr: string = 'EU-SUPER-SPLIT-OF-FILE';

  autoUpload: boolean = false;
  uploadDirectory: boolean = false;
  liveError: boolean = true;

  fileList: NzUploadFile[] = [];
  uploading: boolean = false;

  system: SystemInfo = {};
  configInfo: any[] = ConfigInfo;

  // 服务器相关
  fileDir: string = '';
  deleteAll: boolean = false;
  backupAll: boolean = false;
  lastBackup: boolean = false;

  constructor(
    private http: HttpClient,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.http.get<SystemInfo>('http://localhost:42000/file/system')
      .toPromise()
      .then(res => this.system = res);
  }

  beforeUpload = (file: NzUploadFile) => {
    const obj = this.fileList.find(row => {
      if (file.webkitRelativePath != '') {
        return row.webkitRelativePath === file.webkitRelativePath;
      } else {
        return row.name === file.name;
      }
    });
    if (obj) {
      this.message.error(`${file.name} 文件重复上传!`);
    } else {
      this.fileList = this.fileList.concat(file);
    }
    if (this.fileList.length === 0) return false;
    return this.autoUpload;
  }

  handleUpload = () => {
    this.uploading = true;
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
      .then((res: FileSaveResponse[]) => {
        this.liveError && this.liveErrorHandle(res);
        this.liveError || (this.fileList = []);
        const type: 'success' | 'info' = this.fileList.length > 0 ? 'info' : 'success';
        this.message[type](`上传完毕`);
      }).catch(_ => {
        this.message.error(`上传失败`);
        this.fileList = this.fileList.map(row => {
          row.status = 'error';
          return row;
        });
      }).finally(() => this.uploading = false);
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

  liveErrorHandle = (array: FileSaveResponse[]) => {
    const map: { ERROR: string[]; SUCCESS: string[] } = {
      ERROR: [], SUCCESS: []
    };
    array.forEach(row => map[row.status].push(row.filename));
    this.fileList = this.fileList
      .filter(row => map.ERROR.includes(row.name) || map.ERROR.includes(row.webkitRelativePath))
      .map(row => {
        row.status = 'error';
        return row;
      });
  }
}
