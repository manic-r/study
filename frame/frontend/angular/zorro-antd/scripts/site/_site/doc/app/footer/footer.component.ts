import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="rc-footer rc-footer-dark">
      <section class="rc-footer-container">
        <section class="rc-footer-columns">
          <div app-footer-col title="相关资源">
            <app-footer-item title="NG-ZORRO-MOBILE" link="https://ng.mobile.ant.design/" description="Angular"></app-footer-item>
            <app-footer-item title="Ant Design" link="https://ant.design/docs/react/introduce-cn" description="React"></app-footer-item>
            <app-footer-item title="Ant Design" link="https://vue.ant.design/" description="Vue"></app-footer-item>
            <app-footer-item title="Angular" link="https://angular.io/"></app-footer-item>
            <app-footer-item title="Angular CLI" link="https://cli.angular.io/"></app-footer-item>
          </div>
          <div app-footer-col title="设置">
            <div class="rc-footer-item" style="margin-top: 20px;">
              <div
                class="theme-pick-wrap"
                nz-popover
                [nzPopoverTrigger]="'click'"
                nzPopoverOverlayClassName="theme-color-content"
                [nzPopoverContent]="colorTpl"
              >
                <div class="theme-pick" [ngStyle]="{ background: colorHex }"></div>
              </div>
              <ng-template #colorTpl>
                <color-sketch [color]="colorHex" (onChangeComplete)="changeColor($event)"></color-sketch>
              </ng-template>
            </div>
          </div>
        </section>
      </section>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  @Input() language: string = 'zh';
  @Input() colorHex: string = '#1890ff';
  // tslint:disable-next-line:no-any
  @Output() colorChange = new EventEmitter<any>();

  constructor() { }

  // tslint:disable-next-line:no-any
  changeColor(res: any): void {
    this.colorChange.emit(res);
  }

  ngOnInit(): void { }
}
