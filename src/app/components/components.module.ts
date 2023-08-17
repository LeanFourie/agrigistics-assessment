// Module Imports
import { CommonModule } from '@angular/common'
import { ObserversModule } from '@angular/cdk/observers'
import { NgModule } from '@angular/core'

// Component Imports
import { ActionsListItemComponent } from './base/actions-list-item/actions-list-item.component'
import { ButtonComponent } from './base/button/button.component'
import { CardComponent } from './base/card/card.component';
import { ImageComponent } from './base/image/image.component'
import { IconComponent } from './base/icon/icon.component'
import { InputComponent } from './base/input/input.component'
import { DropdownComponent } from './base/dropdown/dropdown.component'
import { ToggleComponent } from './base/toggle/toggle.component'
import { TextComponent } from './base/text/text.component'
import { ChipComponent } from './base/chip/chip.component';
import { HelperTextComponent } from './base/helper-text/helper-text.component';
import { TooltipComponent } from './base/tooltip/tooltip.component';
import { ActionsListComponent } from './common/actions-list/actions-list.component'
import { FabComponent } from './common/fab/fab.component'
import { HeaderComponent } from './common/header/header.component';
import { NavItemComponent } from './common/nav-item/nav-item.component'
import { PaginationComponent } from './common/pagination/pagination.component'
import { SearchComponent } from './common/search/search.component'
import { TableComponent } from './common/table/table.component'
import { TableLineItemComponent } from './common/table-line-item/table-line-item.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component'
import { NavComponent } from './layout/nav/nav.component';
import { OverflowMenuComponent } from './common/overflow-menu/overflow-menu.component';

@NgModule({
    declarations: [
        // Base
        ActionsListItemComponent,
        ButtonComponent,
        CardComponent,
        ChipComponent,
        DropdownComponent,
        HelperTextComponent,
        IconComponent,
        ImageComponent,
        InputComponent,
        TextComponent,
        ToggleComponent,
        TooltipComponent,

        // Common
        ActionsListComponent,
        FabComponent,
        HeaderComponent,
        NavItemComponent,
        OverflowMenuComponent,
        PaginationComponent,
        SearchComponent,
        TableComponent,
        TableLineItemComponent,

        // Layout
        DashboardComponent,
        NavComponent
    ],
    imports: [
        CommonModule,
        ObserversModule
    ],
    exports: [
        // Base
        ActionsListItemComponent,
        ButtonComponent,
        CardComponent,
        ChipComponent,
        DropdownComponent,
        HelperTextComponent,
        IconComponent,
        ImageComponent,
        InputComponent,
        TextComponent,
        ToggleComponent,
        TooltipComponent,

        // Common
        ActionsListComponent,
        FabComponent,
        HeaderComponent,
        NavItemComponent,
        OverflowMenuComponent,
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
