import { Component } from "@angular/core";

@Component({
  selector: 'demo-eu-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent {

  restrictOneOpen = false;
  accordionTypeEmbed = false;
  sideMenuList = [{
    title: 'Content 1',
    children: [
      { title: 'Child Content 1' },
      { title: 'Child Content 2' },
      { title: 'Child Content ' },
    ]
  }, {
    title: 'Content 2（This is a long sentence for option display.）',
    children: [
      { title: 'Child Content 1 (This is a long sentence for option display.)' },
      { title: 'Child Content 2' },
      { title: 'Child Content 3' },
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
    children: []
  }, {
    title: 'Content 5 (Disabled)',
    disabled: true,
    children: [
    ]
  }, {
    title: 'Content 6 (Dynamic Content)',
    needLoadChildren: true,
    loading: false,
    children: [
    ]
  }];

  itemClick(event: any) {
    console.log('item click' + JSON.stringify(event));
  }
  menuToggle(event: any) {
    console.log('menu toggle' + JSON.stringify(event));

    if (event.open && event.item.needLoadChildren) {
      event.item.loading = true;
      setTimeout(() => {
        event.item.children = [
          { title: 'Child Content 1' },
          { title: 'Child Content 2' }
        ];
        event.item.needLoadChildren = false;
        event.item.loading = false;
      }, 1000);
    }
  }
  log(...v: any) {
    console.log(...v);
  }
}
