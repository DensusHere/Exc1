import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SkyModalModule } from '@skyux/modals';
import { SkyTextEditorModule } from '@skyux/text-editor';

import { TextEditorModalModalComponent } from './text-editor-modal-modal.component';
import { TextEditorModalRoutingModule } from './text-editor-modal-routing.module';
import { TextEditorModalComponent } from './text-editor-modal.component';

@NgModule({
  declarations: [TextEditorModalComponent, TextEditorModalModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkyModalModule,
    SkyTextEditorModule,
    TextEditorModalRoutingModule,
  ],
})
export class TextEditorModalModule {
  public static routes = TextEditorModalRoutingModule.routes;
}
