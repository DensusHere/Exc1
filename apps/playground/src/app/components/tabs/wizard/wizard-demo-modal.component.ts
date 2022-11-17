import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SkyModalInstance } from '@skyux/modals';
import { SkyTabIndex } from '@skyux/tabs';

@Component({
  selector: 'app-wizard-demo-modal',
  templateUrl: './wizard-demo-modal.component.html',
})
export class WizardDemoModalComponent {
  public myForm: UntypedFormGroup;
  public title = 'Wizard Tabset Example';
  public activeIndex: SkyTabIndex = 0;
  public step2Disabled = true;
  public step3Disabled = true;
  public saveDisabled = true;

  constructor(
    public instance: SkyModalInstance,
    formBuilder: UntypedFormBuilder
  ) {
    this.myForm = formBuilder.group({
      requiredValue1: undefined,
      requiredValue2: false,
      requiredValue3: undefined,
    });

    this.myForm.valueChanges.subscribe(() => {
      this.checkRequirementsMet();
    });
  }

  public checkRequirementsMet(): void {
    this.step2Disabled = !this.myForm.get('requiredValue1')?.value;
    this.step3Disabled = !this.myForm.get('requiredValue2')?.value;
    this.saveDisabled = !this.myForm.get('requiredValue3')?.value;
  }

  public onNextClick(): void {
    if (typeof this.activeIndex === 'number') {
      this.activeIndex++;
    } else {
      this.activeIndex = parseInt(this.activeIndex) + 1;
    }
  }

  public onPrevClick(): void {
    if (typeof this.activeIndex === 'number') {
      this.activeIndex--;
    } else {
      this.activeIndex = parseInt(this.activeIndex) - 1;
    }
  }

  public onCancelClick(): void {
    this.instance.cancel();
  }

  public onSave(): void {
    this.instance.save();
  }
}
