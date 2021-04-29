import { Component, Input } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'demo-eu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input('span')
  leftSpan: number = 4;
  userInfoSpan: number = 7;

  constructor(
    private translate: TranslateService
  ) {
  }

  public languageChange(language: string) {
    this.translate.use(language);
  }
}
