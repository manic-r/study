import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easy-unit-angular';
  lang: string;

  constructor(
    private translate: TranslateService
  ) {
    this.lang = this.translate.getBrowserLang();
  }

  selectChange() {
    this.translate.use(this.lang);
  }
}
