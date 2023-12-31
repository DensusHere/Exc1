import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SkyModalInstance } from '@skyux/modals';

@Component({
  selector: 'app-wizard-dropdown-demo-modal',
  templateUrl: './wizard-dropdown-demo-modal.component.html',
})
export class WizardDropdownDemoModalComponent implements OnInit {
  public myForm: UntypedFormGroup;
  public title = 'Wizard Tabset Example';
  public activeIndex = 0;
  public step2Disabled = true;
  public step3Disabled = true;
  public saveDisabled = true;

  #formBuilder: UntypedFormBuilder;

  constructor(
    public instance: SkyModalInstance,
    formBuilder: UntypedFormBuilder
  ) {
    this.#formBuilder = formBuilder;
  }

  public ngOnInit(): void {
    this.myForm = this.#formBuilder.group({
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
    this.activeIndex++;
  }

  public onPrevClick(): void {
    this.activeIndex--;
  }

  public onCancelClick(): void {
    this.instance.cancel();
  }

  public onSave(): void {
    this.instance.save();
  }
}
