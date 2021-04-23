import { Component, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // templateUrl: './app.component.layout.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnChanges {
  lang: string;
  sideSpan: number = 4;
  @ViewChild('footer')
  footer!: ElementRef<HTMLElement>;
  @ViewChild('footerSpan')
  footerSpan!: ElementRef<HTMLElement>;

  title = 'easy-unit-angular';
  // TODO:
  list: string[] = [...new Array(1000)];
  showList: boolean = false;

  constructor(
    private translate: TranslateService
  ) {
    this.lang = this.translate.getBrowserLang();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngAfterViewInit(): void {
    // 可能不设置footer
    if (this.footer && this.footerSpan) {
      // TODO: 将site-var.scss编译后放在`assets`中, get请求读取其值
      // TODO: 此处先写死
      const footerElement = this.footer.nativeElement;
      const footerSpanElement = this.footerSpan.nativeElement;
      if (footerElement.offsetHeight > 42) {
        footerElement.style.bottom = 'auto';
        footerSpanElement.style.height = `${footerSpanElement.offsetHeight - 42}px`;
      }
    }
  }

  selectChange() {
    this.translate.use(this.lang);
  }
}
