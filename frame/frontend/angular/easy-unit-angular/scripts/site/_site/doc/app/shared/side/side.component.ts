import { Component } from "@angular/core";

@Component({
  selector: 'demo-eu-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent {

  constructor() {
    console.log('---------------------SideComponent.html')
  }
}
