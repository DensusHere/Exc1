import { Component } from '@angular/core';
import {
  NgModel,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  SkyAutocompleteSearchAsyncArgs,
  SkyAutocompleteSelectionChange,
} from '@skyux/lookup';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent {
  public controlForm: UntypedFormGroup;
  public reactiveForm: UntypedFormGroup;
  public favoriteColorFormControl: UntypedFormControl;

  public templateDrivenModel: NgModel | undefined;

  public data: { name: string }[] = [
    { name: 'Red' },
    { name: 'Blue' },
    { name: 'Green' },
    { name: 'Orange' },
    { name: 'Pink' },
    { name: 'Purple' },
    { name: 'Yellow' },
    { name: 'Brown' },
    { name: 'Turquoise' },
    { name: 'White' },
    { name: 'Black' },
  ];

  public templateDisabledState = false;

  private reactiveDisabledState = false;

  constructor(formBuilder: UntypedFormBuilder) {
    this.controlForm = formBuilder.group({
      searchTextMin: undefined,
      searchTextMinTemplate: undefined,
    });
    this.favoriteColorFormControl = new UntypedFormControl();
    this.reactiveForm = formBuilder.group({
      favoriteColor: this.favoriteColorFormControl,
      favoriteColorAsync: undefined,
    });
  }

  public toggleReactiveDisabled(): void {
    if (this.reactiveDisabledState) {
      this.favoriteColorFormControl.enable();
    } else {
      this.favoriteColorFormControl.disable();
    }

    this.reactiveDisabledState = !this.reactiveDisabledState;
  }

  public toggleTemplateDisabled(): void {
    this.templateDisabledState = !this.templateDisabledState;
  }

  public onSelectionChange(event: SkyAutocompleteSelectionChange): void {
    console.log(event);
  }

  public favoriteColorSearch(args: SkyAutocompleteSearchAsyncArgs): void {
    const searchText = (args.searchText || '').toLowerCase();

    const filteredData = this.data.filter(
      (item) => item.name.toLowerCase().indexOf(searchText) >= 0
    );

    args.result = of({
      items: filteredData,
      totalCount: filteredData.length,
    }).pipe(delay(1000));
  }
}
