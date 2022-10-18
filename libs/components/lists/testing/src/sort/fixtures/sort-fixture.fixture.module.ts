import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkyToolbarModule } from '@skyux/layout';
import { SkyRepeaterModule, SkySortModule } from '@skyux/lists';

import { SortFixtureTestComponent } from './sort-fixture.component.fixture';

/**
 * @internal
 */
@NgModule({
  declarations: [SortFixtureTestComponent],
  imports: [CommonModule, SkySortModule, SkyRepeaterModule, SkyToolbarModule],
})
export class SkySortTestingModule {}
