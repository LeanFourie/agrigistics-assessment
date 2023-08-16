// Module imports
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { PagesModule } from './pages/pages.module'

// Component Imports
import { AppComponent } from './app.component'

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        PagesModule
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
