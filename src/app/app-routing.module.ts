// Core Imports
import {
    RouterModule,
    Routes
} from '@angular/router'

// Module Imports
import { NgModule } from '@angular/core'

// Component Imports
import { AreaManagerComponent } from './pages/area-manager/area-manager.component'

const routes: Routes = [
    {
        path: '',
        component: AreaManagerComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
