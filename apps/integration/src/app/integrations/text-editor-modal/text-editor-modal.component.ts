import { Component } from '@angular/core';
import { SkyModalService } from '@skyux/modals';

import { TextEditorModalModalComponent } from './text-editor-modal-modal.component';

@Component({
  selector: 'app-text-editor-modal',
  templateUrl: './text-editor-modal.component.html',
})
export class TextEditorModalComponent {
  #modalSvc: SkyModalService;

  constructor(modalSvc: SkyModalService) {
    this.#modalSvc = modalSvc;
  }

  public openModal(): void {
    this.#modalSvc.open(TextEditorModalModalComponent);
  }
}
