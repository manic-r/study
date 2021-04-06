import { Component } from "@angular/core";

@Component({
  selector: 'demo-eu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() {
    console.log('---------------------HeaderComponent.html')
  }
}
