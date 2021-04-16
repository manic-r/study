import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'demo-eu-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit, AfterViewInit {

  @Input('nzSpan')
  span: number = 4;

  sideMenuList: any = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('./assets/menu.json').toPromise().then((res) => this.sideMenuList = res);
  }

  ngAfterViewInit(): void {
    const menu: HTMLElement = <HTMLElement>document.getElementById('menu') || {};
    // 设置插件宽度，防止滚动条出现占用位置
    // const parentElement: HTMLElement = <HTMLElement>document.getElementsByTagName('demo-eu-side')[0] || {};
    // const parentWidth: number = parentElement?.scrollWidth || 0;
    // menu?.setAttribute('style', `width: ${parentWidth - 9}px`);
    // 去掉插件外边框
    (menu.firstChild as HTMLElement)?.setAttribute('style', 'box-shadow: none');
  }
}
