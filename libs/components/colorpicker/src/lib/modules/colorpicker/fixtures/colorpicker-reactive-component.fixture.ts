import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { Subject } from 'rxjs';

import { SkyColorpickerComponent } from '../colorpicker.component';
import { SkyColorpickerMessage } from '../types/colorpicker-message';
import { SkyColorpickerMessageType } from '../types/colorpicker-message-type';

@Component({
  selector: 'sky-colorpicker-fixture',
  templateUrl: './colorpicker-reactive-component.fixture.html',
})
export class ColorpickerReactiveTestComponent {
  public selectedHexType = 'hex6';
  public initialColor: string | undefined = '#2889e5';
  public selectedOutputFormat = 'rgba';
  public presetColors = [
    '#333333',
    '#888888',
    '#EFEFEF',
    '#FFF',
    '#BD4040',
    '#617FC2',
    '#60AC68',
    '#3486BA',
    '#E87134',
    '#DA9C9C',
    '#A1B1A7',
    '#68AFEF',
  ];
  public inputType = 'text';

  @ViewChild('colorPickerTest', {
    static: true,
  })
  public colorpickerComponent!: SkyColorpickerComponent;
  public colorpickerController = new Subject<SkyColorpickerMessage>();

  public showMultiple = false;
  public newValues = {
    colorModel: '#000',
    colorModel2: '#111',
    colorModel3: '#222',
    colorModel4: '#333',
  };

  public colorControl = new UntypedFormControl('#00f');
  public colorControl2 = new UntypedFormControl('#aaa');
  public colorControl3 = new UntypedFormControl('#bbb');
  public colorControl4 = new UntypedFormControl('#ccc');
  public colorForm = new UntypedFormGroup({
    colorModel: this.colorControl,
    colorModel2: this.colorControl2,
    colorModel3: this.colorControl3,
    colorModel4: this.colorControl4,
  });

  public sendMessage(type: SkyColorpickerMessageType) {
    this.colorpickerController.next({ type });
  }
}
