import { Component, OnInit } from '@angular/core';
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
export class LookupCustomPickerComponent implements OnInit {
  public myForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public context: SkyLookupShowMoreCustomPickerContext,
    public modalInstance: SkyModalInstance
  ) {}

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      selectLast: new UntypedFormControl(false),
    });
  }
}
