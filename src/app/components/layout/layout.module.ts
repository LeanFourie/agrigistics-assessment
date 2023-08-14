// Module Imports
import { NgModule } from '@angular/core'

// Component Imports
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
    declarations: [
        NavComponent,
        DashboardComponent
    ],
    exports: [
        NavComponent,
        DashboardComponent
    ]
})

export class LayoutComponentsModule {}
