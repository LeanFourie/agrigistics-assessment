// Module Imports
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ComponentsModule } from './../components/components.module'

// Component Imports
import { AreaManagerComponent } from './area-manager/area-manager.component'

@NgModule({
    declarations: [
        AreaManagerComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule
    ]
})

export class PagesModule {}
