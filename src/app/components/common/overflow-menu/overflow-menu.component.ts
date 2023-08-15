// Core Imports
import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output
} from '@angular/core'

// Definition Imports
import type { CommonOverflowMenuInterface } from './overflow-menu.definitions'

@Component({
    selector: 'common-overflow-menu',
    templateUrl: './overflow-menu.component.html',
    styleUrls: [
        './overflow-menu.component.scss'
    ]
})

export class OverflowMenuComponent {
    // REQUIRED INPUTS
    /**
     * Determines the actions to render in the context menu
     * 
     * @default []
     */
    @Input() public actions: CommonOverflowMenuInterface[ 'actions' ] = []

    // OPTIONAL INPUTS
    /**
     * Determines the color of the overflow trigger
     * 
     * @default `black`
     */
    @Input() public color?: CommonOverflowMenuInterface[ 'color' ] = 'black'

    // REQUIRED OUTPUS
    /**
     * Emits click events from the action items
     */
    @Output() public onActionClick: CommonOverflowMenuInterface[ 'onActionClick' ] = new EventEmitter()

    // CONSTRUCTOR
    constructor( private elementRef: ElementRef ) {}

    // PUBLIC VARIABLES
    public showMenu: boolean = false

    // HOST LISTENERS
    /**
     * Close the menu when a click occurs outside the component
     */
    @HostListener( 'document:click', [ '$event' ] )
    public handleDocumentClick( event: Event ): void {
        // Detect whether the click event is inside the overflow component
        const clickedInside: boolean = this.elementRef.nativeElement.contains( event.target )

        // If the click event is outside of the component hide the menu
        if ( !clickedInside ) this.showMenu = false
    }

    // METHODS
    /**
     * Handle click events on the action items
     */
    public handleActionClick = (): void => {
        // Toggle the menu visibility
        this.handleTriggerClick()

        // Emit the click event
        this.onActionClick.emit()
    }

    /**
     * Shows and hides the menu by toggling the `showMenu` variable
     */
    public handleTriggerClick = (): void => {
        // Toggle the menu visibility
        this.showMenu = !this.showMenu
    }
}
