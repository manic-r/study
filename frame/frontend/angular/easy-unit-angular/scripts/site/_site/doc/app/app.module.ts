import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpType, TranslateYamlLoader } from '../loaders/translate-yaml-loader';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

export function TranslateYamlFactory(http: HttpType) {
  return new TranslateYamlLoader(http, './assets/i18n', 'language.', 'yaml');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateYamlFactory,
        deps: [HttpBackend]
      },
      useDefaultLang: true,
      defaultLanguage: 'zh'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
