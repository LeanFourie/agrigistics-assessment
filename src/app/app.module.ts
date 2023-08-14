import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/base/button/button.component';
import { ImageComponent } from './components/base/image/image.component';
import { IconComponent } from './components/base/icon/icon.component';
import { InputComponent } from './components/base/input/input.component';
import { DropdownComponent } from './components/base/dropdown/dropdown.component';
import { ToggleComponent } from './components/base/toggle/toggle.component';
import { SearchComponent } from './components/common/search/search.component';
import { TextComponent } from './components/base/text/text.component';
import { TableLineItemComponent } from './components/common/table-line-item/table-line-item.component';
import { PaginationComponent } from './components/common/pagination/pagination.component';
import { TableComponent } from './components/common/table/table.component';
import { NavItemComponent } from './components/common/nav-item/nav-item.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { ChipComponent } from './components/base/chip/chip.component';
import { FabComponent } from './components/common/fab/fab.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ImageComponent,
    IconComponent,
    InputComponent,
    DropdownComponent,
    ToggleComponent,
    SearchComponent,
    TextComponent,
    TableLineItemComponent,
    PaginationComponent,
    TableComponent,
    NavItemComponent,
    NavComponent,
    ChipComponent,
    FabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
