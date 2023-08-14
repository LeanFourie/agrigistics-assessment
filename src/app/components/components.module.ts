// Module Imports
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

// Component Imports
import { ActionsListItemComponent } from './base/actions-list-item/actions-list-item.component'
import { ButtonComponent } from './base/button/button.component'
import { ImageComponent } from './base/image/image.component'
import { IconComponent } from './base/icon/icon.component'
import { InputComponent } from './base/input/input.component'
import { DropdownComponent } from './base/dropdown/dropdown.component'
import { ToggleComponent } from './base/toggle/toggle.component'
import { TextComponent } from './base/text/text.component'
import { ChipComponent } from './base/chip/chip.component';
import { TooltipComponent } from './base/tooltip/tooltip.component';
import { ActionsListComponent } from './common/actions-list/actions-list.component'
import { FabComponent } from './common/fab/fab.component'
import { NavItemComponent } from './common/nav-item/nav-item.component'
import { PaginationComponent } from './common/pagination/pagination.component'
import { SearchComponent } from './common/search/search.component'
import { TableComponent } from './common/table/table.component'
import { TableLineItemComponent } from './common/table-line-item/table-line-item.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component'
import { NavComponent } from './layout/nav/nav.component';
import { HelperTextComponent } from './base/helper-text/helper-text.component';

@NgModule({
    declarations: [
        // Base
        ActionsListItemComponent,
        ButtonComponent,
        ChipComponent,
        DropdownComponent,
        IconComponent,
        ImageComponent,
        InputComponent,
        TextComponent,
        ToggleComponent,
        TooltipComponent,

        // Common
        ActionsListComponent,
        FabComponent,
        NavItemComponent,
        PaginationComponent,
        SearchComponent,
        TableComponent,
        TableLineItemComponent,

        // Layout
        DashboardComponent,
        NavComponent,
        HelperTextComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        // Base
        ActionsListItemComponent,
        ButtonComponent,
        ChipComponent,
        DropdownComponent,
        IconComponent,
        ImageComponent,
        InputComponent,
        TextComponent,
        ToggleComponent,
        TooltipComponent,

        // Common
        ActionsListComponent,
        FabComponent,
        NavItemComponent,
        PaginationComponent,
        SearchComponent,
        TableComponent,
        TableLineItemComponent,

        // Layout
        DashboardComponent,
        NavComponent
    ]
})

export class ComponentsModule {}
