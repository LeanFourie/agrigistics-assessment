// Module Imports
import { NgModule } from '@angular/core'
import { ComponentsModule } from './../components/components.module'

// Component Imports
import { AreaManagerComponent } from './area-manager/area-manager.component'

@NgModule({
    declarations: [
        AreaManagerComponent
    ],
    imports: [
        ComponentsModule
    ]
})

export class PagesModule {}
