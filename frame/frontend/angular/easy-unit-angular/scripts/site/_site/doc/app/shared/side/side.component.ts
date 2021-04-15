import { AfterViewInit, Component, OnInit } from "@angular/core";

@Component({
  selector: 'demo-eu-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    console.log('.....................')
  }

  ngAfterViewInit(): void {
    const firstChild = document.getElementById('menu')?.children[0];
    firstChild?.setAttribute('style', 'box-shadow: none');
  }

  sideMenuList = [{
    title: 'Content 1',
    open: true,
    children: [
      { title: 'Child Content 1' },
      { title: 'Child Content 2' },
      { title: 'Child Content ' },
    ]
  }, {
    title: 'Content 2（This is a long sentence for option display.）',
    open: true,
    children: [
      { title: 'Child Content 1 (This is a long sentence for option display.)' },
      { title: 'Child Content 2' },
      {
        title: 'Child Content 3', children: [
          { title: 'Child Content 1 (This is a long sentence for option display.)' },
          { title: 'Child Content 2' },
          { title: 'Child Content 3' },
        ]
      },
    ]
  }, {
    title: 'Content 3 (Default Open)',
    open: true,
    children: [
      { title: 'Child Content 1 (Disabled)', disabled: true },
      { title: 'Child Content 2 (Default Active)', active: true },
      { title: 'Child Content 3' },
    ]
  }, {
    title: 'Content 4 (No Child)',
    open: true,
    children: []
  }, {
    title: 'Content 5 (Disabled)',
    open: true,
    disabled: true,
    children: [
    ]
  }, {
    title: 'Content 6 (Dynamic Content)',
    open: true,
    needLoadChildren: true,
    loading: false,
    children: [
    ]
  }];
}
