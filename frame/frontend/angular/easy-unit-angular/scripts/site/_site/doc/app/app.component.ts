import { Component, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  lang: string;
  sideSpan: number = 4;
  title = 'easy-unit-angular';
  // TODO:
  list: string[] = [...new Array(1000)];
  showList: boolean = false;

  constructor(
    private translate: TranslateService
  ) {
    this.lang = this.translate.getBrowserLang();
  }

  ngAfterViewInit(): void {
    this.listenOfScrollbar();
  }

  selectChange() {
    this.translate.use(this.lang);
  }

  listenOfScrollbar() {
    console.log(document.documentElement.scrollHeight)
  }
}
