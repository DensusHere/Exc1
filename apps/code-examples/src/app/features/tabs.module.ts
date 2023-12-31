import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SectionedFormDemoComponent as SectionedFormModalDemoComponent } from '../code-examples/tabs/sectioned-form/modal/sectioned-form-demo.component';
import { SectionedFormDemoModule as SectionedFormModalSectionedFormDemoModule } from '../code-examples/tabs/sectioned-form/modal/sectioned-form-demo.module';
import { TabsDemoComponent as TabsDynamicAddCloseTabsDemoComponent } from '../code-examples/tabs/tabs/dynamic-add-close/tabs-demo.component';
import { TabsDemoModule as TabsDynamicAddCloseTabsDemoModule } from '../code-examples/tabs/tabs/dynamic-add-close/tabs-demo.module';
import { TabsDemoComponent as TabsDynamicTabsDemoComponent } from '../code-examples/tabs/tabs/dynamic/tabs-demo.component';
import { TabsDemoModule as TabsDynamicTabsDemoModule } from '../code-examples/tabs/tabs/dynamic/tabs-demo.module';
import { TabsDemoComponent as TabsStaticAddCloseTabsDemoComponent } from '../code-examples/tabs/tabs/static-add-close/tabs-demo.component';
import { TabsDemoModule as TabsStaticAddCloseTabsDemoModule } from '../code-examples/tabs/tabs/static-add-close/tabs-demo.module';
import { TabsDemoComponent as TabsStaticTabsDemoComponent } from '../code-examples/tabs/tabs/static/tabs-demo.component';
import { TabsDemoModule as TabsStaticTabsDemoModule } from '../code-examples/tabs/tabs/static/tabs-demo.module';
import { VerticalTabDemoComponent as VerticalTabsBasicVerticalTabsDemoComponent } from '../code-examples/tabs/vertical-tabs/basic/vertical-tabs-demo.component';
import { SkyVerticalTabDemoModule as VerticalTabsBasicVerticalTabsDemoModule } from '../code-examples/tabs/vertical-tabs/basic/vertical-tabs-demo.module';
import { SkyVerticalTabsDemoComponent as VerticalTabsGroupedVerticalTabsDemoComponent } from '../code-examples/tabs/vertical-tabs/grouped/vertical-tabs-demo.component';
import { SkyVerticalTabDemoModule as VerticalTabsGroupedVerticalTabsDemoModule } from '../code-examples/tabs/vertical-tabs/grouped/vertical-tabs-demo.module';
import { WizardDemoComponent } from '../code-examples/tabs/wizard/basic/wizard-demo.component';
import { WizardDemoModule } from '../code-examples/tabs/wizard/basic/wizard-demo.module';

const routes: Routes = [
  { path: 'sectioned-form/modal', component: SectionedFormModalDemoComponent },
  { path: 'tabs/dynamic', component: TabsDynamicTabsDemoComponent },
  {
    path: 'tabs/dynamic-add-close',
    component: TabsDynamicAddCloseTabsDemoComponent,
  },
  { path: 'tabs/static', component: TabsStaticTabsDemoComponent },
  {
    path: 'tabs/static-add-close',
    component: TabsStaticAddCloseTabsDemoComponent,
  },
  {
    path: 'vertical-tabs/basic',
    component: VerticalTabsBasicVerticalTabsDemoComponent,
  },
  {
    path: 'vertical-tabs/grouped',
    component: VerticalTabsGroupedVerticalTabsDemoComponent,
  },
  {
    path: 'tabs/wizard/basic',
    component: WizardDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsFeatureRoutingModule {}

@NgModule({
  imports: [
    SectionedFormModalSectionedFormDemoModule,
    TabsDynamicTabsDemoModule,
    TabsDynamicAddCloseTabsDemoModule,
    TabsStaticTabsDemoModule,
    TabsStaticAddCloseTabsDemoModule,
    VerticalTabsBasicVerticalTabsDemoModule,
    VerticalTabsGroupedVerticalTabsDemoModule,
    TabsFeatureRoutingModule,
    WizardDemoModule,
  ],
})
export class TabsFeatureModule {}
