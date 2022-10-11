import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SkyAgGridHeader, SkyAgGridHeaderInfo } from '@skyux/ag-grid';

@Component({
  selector: 'app-inline-help',
  templateUrl: './inline-help.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineHelpComponent {
  readonly #displayName: string;

  constructor(
    @Inject(SkyAgGridHeader)
    { displayName }: SkyAgGridHeaderInfo
  ) {
    this.#displayName = displayName;
  }

  public onHelpClick(): void {
    console.log(`Help was clicked for ${this.#displayName}.`);
  }
}