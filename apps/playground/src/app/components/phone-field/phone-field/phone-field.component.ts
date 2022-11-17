import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-field',
  templateUrl: './phone-field.component.html',
})
export class PhoneFieldComponent {
  public phoneNumber: string | undefined;

  public phoneNumberInputBox: string | undefined;

  public phoneForm: UntypedFormGroup;

  public phoneControl: UntypedFormControl;

  public constructor() {
    this.phoneControl = new UntypedFormControl();
    this.phoneForm = new UntypedFormGroup({
      phoneControl: this.phoneControl,
    });
  }
}
