import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IntegrationRouteInfo } from '../../shared/integration-info/integration-route-info';

import { TextEditorModalComponent } from './text-editor-modal.component';

const routes: IntegrationRouteInfo[] = [
  {
    path: '',
    component: TextEditorModalComponent,
    data: {
      name: 'Text editor modal',
      icon: 'list-alt',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TextEditorModalRoutingModule {
  public static routes = routes;
}
