import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkyThemeModule } from '@skyux/theme';

import { PreviewWrapperComponent } from './preview-wrapper.component';

@NgModule({
  declarations: [PreviewWrapperComponent],
  exports: [PreviewWrapperComponent],
  imports: [CommonModule, SkyThemeModule],
})
export class PreviewWrapperModule {}
