import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'easy-unit-angular';
  lang: string;

  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.lang = this.translate.getBrowserLang();
  }

  selectChange() {
    this.translate.use(this.lang);
  }

  //////////////////////////////
  sideMenuList: any = [];


  ngOnInit(): void {
    this.http.get('./assets/menu.json').toPromise().then((res) => this.sideMenuList = res);
  }

  ngAfterViewInit(): void {
    const menu: HTMLElement = <HTMLElement>document.getElementById('menu') || {};
    // 设置插件宽度，防止滚动条出现占用位置
    const parentWidth: number = menu?.parentElement?.clientWidth || 0;
    menu?.setAttribute('style', `width: ${parentWidth - 9}px`);
    // 去掉插件外边框
    (menu.firstChild as HTMLElement)?.setAttribute('style', 'box-shadow: none');
  }
}
