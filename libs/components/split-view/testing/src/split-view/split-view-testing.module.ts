import { NgModule } from '@angular/core';
import { SkySplitViewModule } from '@skyux/split-view';
import { SkyThemeService } from '@skyux/theme';

/**
 * @internal
 */
@NgModule({
  exports: [SkySplitViewModule],
  providers: [SkyThemeService],
})
export class SkySplitViewTestingModule {}
