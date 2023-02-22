import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SkyModalInstance } from '@skyux/modals';
import {
  SkyTextEditorMenuType,
  SkyTextEditorToolbarActionType,
} from '@skyux/text-editor';

@Component({
  selector: 'app-text-editor-modal-modal',
  templateUrl: './text-editor-modal-modal.component.html',
})
export class TextEditorModalModalComponent {
  public displayValue: SafeHtml | undefined;

  public menus: SkyTextEditorMenuType[] = ['edit', 'format', 'merge-field'];

  public mergeFields = [
    {
      id: '0',
      name: 'Best field',
    },
    {
      id: '1',
      name: 'Second best field',
    },
    {
      id: '2',
      name: 'A field that is really too long for its own good',
    },
  ];

  public myForm: FormGroup;

  public placeholder = 'Please enter some text';

  public get textEditorControl(): AbstractControl | undefined | null {
    return this.myForm.get('textEditor');
  }

  public toolbarActions: SkyTextEditorToolbarActionType[] = [
    'font-family',
    'font-size',
    'font-style',
    'color',
    'list',
    'alignment',
    'indentation',
    'undo-redo',
    'link',
  ];

  constructor(
    public instance: SkyModalInstance,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.myForm = this.formBuilder.group({
      textEditor: new FormControl(
        '<font style="font-size: 16px" color="#a25353"><b><i><u>Super styled text</u></i></b></font>',
        [Validators.required]
      ),
    });

    this.textEditorControl?.valueChanges.subscribe((value) => {
      this.displayValue = this.sanitizer.bypassSecurityTrustHtml(value);
    });
  }

  public onToggleDisableClick(): void {
    if (this.myForm.controls['textEditor'].disabled) {
      this.myForm.controls['textEditor'].enable();
    } else {
      this.myForm.controls['textEditor'].disable();
    }
  }
}
