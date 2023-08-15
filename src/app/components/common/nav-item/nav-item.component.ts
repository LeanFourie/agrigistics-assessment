// Core Imports
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'

// Definition Imports
import type { CommonNavItem } from './nav-item.definitions'

@Component({
    selector: 'common-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: [
        './nav-item.component.scss'
    ]
})

export class NavItemComponent {
    // REQUIRED INPUTS
    /**
     * Determines the icon for the nav item
     * 
     * @default ``
     */
    @Input() public icon: CommonNavItem[ 'icon' ] = ''

    /**
     * Determines the label for the nav item to be rendered inside the tooltip
     * 
     * @default ``
     */
    @Input() public label: CommonNavItem[ 'label' ] = ''

    // REQUIRED OUTPUTS
    /**
     * Emits the click event from the nav item
     */
    @Output() public onClick: CommonNavItem[ 'onClick' ] = new EventEmitter()

    // METHODS
    /**
     * Handle click events on the nav item
     */
    public handleClick = (): void => {
        // Log the click event
        console.log( 'Clicked' )

        // Emit the click event
        this.onClick.emit()
    }
}
