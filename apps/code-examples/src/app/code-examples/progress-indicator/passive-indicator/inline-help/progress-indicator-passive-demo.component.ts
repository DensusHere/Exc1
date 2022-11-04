import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-indicator-passive-demo',
  templateUrl: './progress-indicator-passive-demo.component.html',
})
export class SkyProgressIndicatorPassiveDemoComponent {
  public onActionClick(): void {
    alert('Help inline button clicked!');
  }
}
