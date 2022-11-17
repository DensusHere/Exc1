import { Component } from '@angular/core';
import { SkySectionedFormService } from '@skyux/tabs';

@Component({
  selector: 'app-sectioned-form-information-form-demo',
  templateUrl: './sectioned-form-information-form-demo.component.html',
})
export class SectionedFormInformationFormDemoComponent {
  public name = '';
  public id = '5324901';

  #_nameRequired = false;

  public get nameRequired(): boolean {
    return this.#_nameRequired;
  }
  public set nameRequired(value: boolean | undefined) {
    this.#_nameRequired = !!value;

    if (value) {
      this.#sectionService.requiredFieldChanged(true);
    } else {
      this.#sectionService.requiredFieldChanged(false);
    }
  }

  #sectionService: SkySectionedFormService;

  public constructor(sectionService: SkySectionedFormService) {
    this.#sectionService = sectionService;
  }

  public checkValidity(): void {
    if (!this.name && this.nameRequired) {
      this.#sectionService.invalidFieldChanged(true);
    } else {
      this.#sectionService.invalidFieldChanged(false);
    }
  }

  public nameChange(newName: string): void {
    this.name = newName;

    this.checkValidity();
  }
}
