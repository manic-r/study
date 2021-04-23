import { Component, Input } from "@angular/core";

@Component({
  selector: 'demo-eu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input('nzSpan')
  leftSpan: number = 4;

  constructor() {
    console.log('---------------------HeaderComponent.html')
  }
}
