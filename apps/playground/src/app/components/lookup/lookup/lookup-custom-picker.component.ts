import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { SkyLookupShowMoreCustomPickerContext } from '@skyux/lookup';
import { SkyModalInstance } from '@skyux/modals';

@Component({
  selector: 'app-lookup-custom-picker',
  templateUrl: './lookup-custom-picker.component.html',
})
export class LookupCustomPickerComponent {
  public myForm: UntypedFormGroup;
  public selectLastFormControl: UntypedFormControl;

  constructor(
    formBuilder: UntypedFormBuilder,
    public context: SkyLookupShowMoreCustomPickerContext,
    public modalInstance: SkyModalInstance
  ) {
    this.selectLastFormControl = new UntypedFormControl(false);
    this.myForm = formBuilder.group({
      selectLast: this.selectLastFormControl,
    });
  }
}
