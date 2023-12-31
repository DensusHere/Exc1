import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'div.tile2',
  templateUrl: './tile-demo-tile2.component.html',
})
export class TileDemoTile2Component {
  public onActionClick(): void {
    alert('Help inline button clicked!');
  }

  public onHelpClick($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
