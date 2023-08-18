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
import type { CommonFabInterface } from './fab.definitions'

@Component({
    selector: 'common-fab',
    templateUrl: './fab.component.html',
    styleUrls: [
        './fab.component.scss'
    ]
})

export class FabComponent {
    // REQUIRED INPUTS
    /**
     * Determines the icon to render for the FAB
     * 
     * @default ``
     */
    @Input() public icon: CommonFabInterface[ 'icon' ] = ''

    /**
     * Determines the label to render for the FAB
     * 
     * @default ``
     */
    @Input() public label: CommonFabInterface[ 'label' ] = ''

    // OPTIONAL INPUTS
    /**
     * Adds additional action items for the FAB
     * 
     * @default undefined
     */
    @Input() public actions?: CommonFabInterface[ 'actions' ]

    /**
     * Determines the color of the FAB
     * 
     * @default `primary`
     */
    @Input() public color?: CommonFabInterface[ 'color' ] = 'primary'

    /**
     * Determines the shade of the FAB
     * 
     * @default `dark`
     */
    @Input() public shade?: CommonFabInterface[ 'shade' ] = 'dark'

    // OPTIONAL OUTPUTS
    /**
     * Emits the click event form the FAB
     */
    @Output() public onClick?: CommonFabInterface[ 'onClick' ] = new EventEmitter()

    // CONSTRUCTOR
    constructor( private elementRef: ElementRef ) {}

    // HOST LISTENERS
    @HostListener( 'window:scroll', [ '$event' ] )
    onWindowScroll() {
        const scrollY = window.scrollY

        this.hideLabel = scrollY > 20
    }

    @HostListener( 'document:click', [ '$event' ] )
    public handleDocumentClick( event: Event ): void {
        // Detect whether the click event is inside the overflow component
        const clickedInside: boolean = this.elementRef.nativeElement.contains( event.target )

        // If the click event is outside of the component hide the menu
        if ( !clickedInside && this.showOptions ) this.showOptions = false
    }

    // PUBLIC VARIABLES
    public className: string = 'fab'
    public hideLabel: boolean = false
    public showOptions: boolean = false

    // METHODS
    /**
     * Handle click events on the FAB button element
     */
    public handleClick = (): void => {
        if ( this.actions && this.actions.length > 0 ) {
            this.showOptions = !this.showOptions

            return
        }

        this.onClick!.emit()
    }

    /**
     * Generates the required class names for the component
     * 
     * @returns A string with relevant class names
     */
    public returnClassNames = (): string => {
        return `
            ${ this.className }
            ${ this.className }--color-${ this.color }
            ${ this.className }--shade-${ this.shade }
        `
    }
}
