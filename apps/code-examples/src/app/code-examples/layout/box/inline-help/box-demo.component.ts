import { Component } from '@angular/core';

@Component({
  selector: 'app-box-demo',
  templateUrl: './box-demo.component.html',
})
export class BoxDemoComponent {
  public onActionClick(): void {
    alert('Help inline button clicked!');
  }
}
