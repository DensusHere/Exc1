import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DragulaService } from 'ng2-dragula';

import { SkyTileContentModule } from './tile-content/tile-content.module';
import { SkyTileDashboardColumnModule } from './tile-dashboard-column/tile-dashboard-column.module';
import { SkyTileDashboardModule } from './tile-dashboard/tile-dashboard.module';
import { SkyTileModule } from './tile/tile.module';

@NgModule({
  imports: [CommonModule],
  exports: [
    SkyTileContentModule,
    SkyTileModule,
    SkyTileDashboardColumnModule,
    SkyTileDashboardModule,
  ],
  providers: [DragulaService],
})
export class SkyTilesModule {}
