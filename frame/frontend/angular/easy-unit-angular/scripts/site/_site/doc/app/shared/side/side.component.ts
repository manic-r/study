import { AfterViewInit, Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'demo-eu-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit, AfterViewInit {

  sideMenuList: any = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('./assets/menu.json').toPromise().then((res) => this.sideMenuList = res);
  }

  ngAfterViewInit(): void {
    const firstChild = document.getElementById('menu')?.children[0];
    firstChild?.setAttribute('style', 'box-shadow: none');
  }
}
