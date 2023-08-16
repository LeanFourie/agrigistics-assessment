// Core Imports
import {
    Component,
    Input
} from '@angular/core'

// Definition Imports
import type { CommonHeaderInterface } from './header.defnitions'

@Component({
    selector: 'common-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})

export class HeaderComponent {
    // REQUIRED INPUTS
    /**
     * Determines the heading to render for the header
     */
    @Input() public heading: CommonHeaderInterface[ 'heading' ] = ''

    /**
     * Determines the paragraph to render for the header
     */
    @Input() public paragraph: CommonHeaderInterface[ 'paragraph' ] = ''
}
