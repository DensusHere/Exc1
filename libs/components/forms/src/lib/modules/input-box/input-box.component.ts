import {
  BooleanInput,
  NumberInput,
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@angular/cdk/coercion';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  AbstractControlDirective,
  FormControlDirective,
  FormControlName,
  NgModel,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SkyIdService } from '@skyux/core';

import { SkyInputBoxAdapterService } from './input-box-adapter.service';
import { SkyInputBoxControlDirective } from './input-box-control.directive';
import { SkyInputBoxHostService } from './input-box-host.service';
import { SkyInputBoxPopulateArgs } from './input-box-populate-args';

/**
 * Creates a wrapper to provide styling for SKY UX input components and  `input`, `textarea`, `select`, and `label` elements.
 * To render the component, include the `sky-form-control` class on the input element and the `sky-control-label`
 * class on the `label` element. To display a help button beside the label, include a `sky-help-inline` component with a
 * `sky-control-help` class in the `sky-input-box` element. To display a validation error message under the input, include a
 * `sky-status-indicator` component with a `sky-error-indicator` class in the `sky-input-box` element. Use `*ngIf` to determine
 * whether to display the validation message based on the input value.
 */
@Component({
  selector: 'sky-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
  providers: [SkyInputBoxAdapterService, SkyInputBoxHostService],
  // Note that change detection is not set to OnPush; default change detection allows the
  // invalid CSS class to be added when the content control's invalid/dirty state changes.
  encapsulation: ViewEncapsulation.None,
})
export class SkyInputBoxComponent implements OnInit, AfterContentChecked {
  #changeRef = inject(ChangeDetectorRef);
  #inputBoxHostSvc = inject(SkyInputBoxHostService);
  #adapterService = inject(SkyInputBoxAdapterService);
  #idSvc = inject(SkyIdService);
  #elementRef = inject(ElementRef);
  #renderer = inject(Renderer2);

  /**
   * Whether to visually highlight the input box in an error state. If not specified, the input box
   * displays in an error state when either the `ngModel` or the Angular `FormControl` contains an error.
   * @default undefined
   */
  @Input()
  public hasErrors: boolean | undefined;

  /**
   * Whether to visually highlight the input box as disabled. To disable the input box's
   * input element, use the HTML `disabled` attribute or the Angular `FormControl.disabled`
   * property. You must set both properties to disable an input element and visually indicate
   * the disabled state on the input box.
   * @default false
   */
  @Input()
  public disabled: boolean | undefined;

  @Input()
  public labelText: string | undefined;

  @Input()
  public get characterLimit(): number | undefined {
    return this.#_characterLimit;
  }

  public set characterLimit(value: NumberInput) {
    this.#_characterLimit = coerceNumberProperty(value, undefined);
    this.#updateMaxLengthValidator();
  }

  @Input()
  public set stacked(value: BooleanInput) {
    this.#_stacked = coerceBooleanProperty(value);
    this.cssClass = this.#_stacked ? 'sky-margin-stacked-lg' : '';
  }

  @Input()
  public helpPopoverTitle: string | undefined;

  @Input()
  public helpPopoverContent: string | TemplateRef<unknown> | undefined;

  public hostInputTemplate: TemplateRef<unknown> | undefined;

  public hostButtonsTemplate: TemplateRef<unknown> | undefined;

  public hostButtonsInsetTemplate: TemplateRef<unknown> | undefined;

  public hostButtonsLeftTemplate: TemplateRef<unknown> | undefined;

  public formControlHasFocus = false;

  public hostIconsInsetTemplate: TemplateRef<unknown> | undefined;

  public hostIconsInsetLeftTemplate: TemplateRef<unknown> | undefined;

  public readonly controlId = this.#idSvc.generateId();
  public readonly errorId = this.#idSvc.generateId();

  @HostBinding('class')
  public cssClass = '';

  @ContentChild(FormControlDirective)
  public formControl: FormControlDirective | undefined;

  @ContentChild(FormControlName)
  public formControlByName: FormControlName | undefined;

  @ContentChild(NgModel)
  public ngModel: NgModel | undefined;

  @ContentChild(SkyInputBoxControlDirective, {
    read: ElementRef,
  })
  public inputRef: ElementRef | undefined;

  protected controlDir: AbstractControlDirective | undefined;
  protected helpPopoverOpen: boolean | undefined;

  protected get hasErrorsComputed(): boolean {
    if (this.hasErrors === undefined) {
      return this.#controlHasErrors(this.controlDir);
    }

    return this.hasErrors;
  }

  protected get required(): boolean {
    return (
      this.controlDir?.control?.hasValidator(Validators.required) ||
      this.inputRef?.nativeElement.required
    );
  }

  #_stacked = false;
  #_characterLimit: number | undefined;

  #previousInputRef: ElementRef | undefined;
  #previousMaxLengthValidator: ValidatorFn | undefined;

  public ngOnInit(): void {
    this.#inputBoxHostSvc.init(this);
  }

  public ngAfterContentChecked(): void {
    this.controlDir =
      this.formControl || this.formControlByName || this.ngModel;

    if (this.inputRef && this.inputRef !== this.#previousInputRef) {
      const el = this.inputRef.nativeElement;

      this.#renderer.addClass(el, 'sky-form-control');
      this.#renderer.setAttribute(el, 'id', this.controlId);
      this.#renderer.setAttribute(el, 'aria-describedby', this.errorId);

      this.#updateMaxLengthValidator();

      this.#previousInputRef = this.inputRef;
    }
  }

  public formControlFocusIn(): void {
    const inlineHelpEl = this.#adapterService.getInlineHelpElement(
      this.#elementRef
    );
    if (!this.#adapterService.isFocusInElement(inlineHelpEl)) {
      this.#updateHasFocus(true);
    }
  }

  public formControlFocusOut(): void {
    this.#updateHasFocus(false);
  }

  public onInsetIconClick(): void {
    if (!this.disabled) {
      this.#adapterService.focusControl(this.#elementRef);
    }
  }

  public populate(args: SkyInputBoxPopulateArgs): void {
    this.hostInputTemplate = args.inputTemplate;
    this.hostButtonsTemplate = args.buttonsTemplate;
    this.hostButtonsLeftTemplate = args.buttonsLeftTemplate;
    this.hostButtonsInsetTemplate = args.buttonsInsetTemplate;
    this.hostIconsInsetTemplate = args.iconsInsetTemplate;
    this.hostIconsInsetLeftTemplate = args.iconsInsetLeftTemplate;
  }

  #updateHasFocus(hasFocus: boolean): void {
    // Some components manipulate the focus of elements inside an input box programmatically,
    // which can cause an `ExpressionChangedAfterItHasBeenCheckedError` if focus was set after
    // initial change detection. Using `setTimeout()` here fixes it.
    setTimeout(() => {
      this.formControlHasFocus = hasFocus;
      this.#changeRef.markForCheck();
    });
  }

  #controlHasErrors(control: AbstractControlDirective | undefined): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  #updateMaxLengthValidator(): void {
    const control = this.controlDir?.control;

    if (this.#previousMaxLengthValidator) {
      control?.removeValidators(this.#previousMaxLengthValidator);
      this.#previousMaxLengthValidator = undefined;
    }

    if (control && this.characterLimit !== undefined) {
      this.#previousMaxLengthValidator = Validators.maxLength(
        this.characterLimit
      );

      control.addValidators([this.#previousMaxLengthValidator]);
    }
  }
}
