import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SkyHelpInlineModule } from '../help-inline.module';

import { HelpInlineTestComponent } from './help-inline.component.fixture';

@NgModule({
  declarations: [HelpInlineTestComponent],
  imports: [CommonModule, SkyHelpInlineModule],
  exports: [HelpInlineTestComponent],
})
export class SkyInlineHelpFixturesModule {}
