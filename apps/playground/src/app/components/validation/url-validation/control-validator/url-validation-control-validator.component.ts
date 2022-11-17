import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SkyUrlValidationOptions, SkyValidators } from '@skyux/validation';

@Component({
  selector: 'app-url-validation-control-validator',
  templateUrl: './url-validation-control-validator.component.html',
})
export class UrlValidationControlValidatorComponent {
  public urlControl: AbstractControl;

  public formGroup: UntypedFormGroup;

  constructor(formBuilder: UntypedFormBuilder) {
    this.urlControl = new UntypedFormControl(undefined, [
      Validators.required,
      SkyValidators.url,
    ]);
    this.formGroup = formBuilder.group({
      url: this.urlControl,
    });
  }

  public skyUrlValidationOptions: SkyUrlValidationOptions = {
    rulesetVersion: 1,
  };

  public toggleRuleset(): void {
    if (this.skyUrlValidationOptions.rulesetVersion === 1) {
      this.skyUrlValidationOptions.rulesetVersion = 2;
    } else if (this.skyUrlValidationOptions.rulesetVersion === 2) {
      this.skyUrlValidationOptions.rulesetVersion = 1;
    }
    this.urlControl.clearValidators();
    const urlValidator = SkyValidators.url(this.skyUrlValidationOptions);
    this.urlControl.addValidators(Validators.required);
    if (urlValidator) {
      this.urlControl.addValidators(urlValidator);
    }
    this.urlControl.updateValueAndValidity();
  }
}
