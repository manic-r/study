import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpType, TranslateYamlLoader } from '../loaders/translate-yaml-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportModules } from './import.module';

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
    BrowserAnimationsModule,
    SharedModule,
    ...ImportModules,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateYamlFactory,
        deps: [HttpBackend]
      },
      useDefaultLang: true,
      defaultLanguage: 'zh-CN'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
