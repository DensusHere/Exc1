import { Component, Input } from '@angular/core';

import { SkyDatepickerCalendarInnerComponent } from './datepicker-calendar-inner.component';
import { SkyDatepickerDate } from './datepicker-date';

/**
 * @internal
 */
@Component({
  selector: 'sky-daypicker-button',
  templateUrl: 'daypicker-button.component.html',
  styleUrls: ['./daypicker-button.component.scss'],
})
export class SkyDayPickerButtonComponent {
  /**
   * The date this picker button will represent on the calendar.
   */
  @Input()
  public date: SkyDatepickerDate | undefined;

  constructor(public datepicker: SkyDatepickerCalendarInnerComponent) {}
}
