import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnChanges {
  language = 'zh';
  @Input() windowWidth = 1400;
  @Input() page: 'docs' | 'components' | string = 'components';
  @Output() directionChange = new EventEmitter<'ltr' | 'rtl'>();

  searching = false;
  isMobile = false;
  mode = 'horizontal';
  responsive: null | 'narrow' | 'crowded' = null;
  nextDirection: 'ltr' | 'rtl' = 'rtl';

  constructor(private nzConfigService: NzConfigService) { }

  onFocusChange(focus: boolean): void {
    this.searching = focus;
  }


  toggleDirection(): void {
    this.directionChange.emit(this.nextDirection);
    this.nzConfigService.set('modal', { nzDirection: this.nextDirection });
    this.nzConfigService.set('drawer', { nzDirection: this.nextDirection });
    this.nzConfigService.set('message', { nzDirection: this.nextDirection });
    this.nzConfigService.set('notification', { nzDirection: this.nextDirection });
    this.nzConfigService.set('image', { nzDirection: this.nextDirection });
    if (this.nextDirection === 'rtl') {
      this.nextDirection = 'ltr';
    } else {
      this.nextDirection = 'rtl';
    }
  }

  updateResponsive(): void {
    this.responsive = null;
    this.isMobile = this.windowWidth <= 768;
    if (this.windowWidth < RESPONSIVE_XS) {
      this.responsive = 'crowded';
    } else if (this.windowWidth < RESPONSIVE_SM) {
      this.responsive = 'narrow';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { windowWidth } = changes;
    if (windowWidth) {
      this.updateResponsive();
    }
  }
}
