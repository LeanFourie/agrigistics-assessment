// Core Imports
import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { WindowSizeService } from './../../../services/window-size.service'

// Definition Imports
import type { CommonNavItemInterface } from './nav-item.definitions'
import type { SizeInterface } from './../../../definitions/interfaces'

@Component({
    selector: 'common-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: [
        './nav-item.component.scss'
    ]
})

export class NavItemComponent implements OnInit, OnDestroy {
    // PRIVATE SUBJECTS
    private _destroy$ = new Subject< void >()

    // REQUIRED INPUTS
    /**
     * Determines the icon for the nav item
     * 
     * @default ``
     */
    @Input() public icon: CommonNavItemInterface[ 'icon' ] = ''

    /**
     * Determines the label for the nav item to be rendered inside the tooltip
     * 
     * @default ``
     */
    @Input() public label: CommonNavItemInterface[ 'label' ] = ''

    // OPTIONAL INPUTS
    /**
     * Determines whether the item icon is filled or not
     * 
     * @default ``
     */
    @Input() public filledIcon: CommonNavItemInterface[ 'filledIcon' ] = false

    // REQUIRED OUTPUTS
    /**
     * Emits the click event from the nav item
     */
    @Output() public onClick: CommonNavItemInterface[ 'onClick' ] = new EventEmitter()

    // CONSTRUCTOR
    constructor( private windowSizeService: WindowSizeService ) {}

    // PUBLIC VARIABLERS
    public showTooltip: boolean = false

    public windowSize: SizeInterface = {
        width: 0,
        height: 0
    }

    public tabletBrakpoint: number = this.windowSizeService.tabletSize.max

    // METHODS
    /**
     * Handle click events on the nav item
     */
    public handleClick = (): void => {
        // Emit the click event
        this.onClick.emit()
    }

    /**
     * Toggles the visibility of the tooltip
     */
    public toggleTooltipVisibility = (): void => {
        // Check if the current window size is within the range of tablet and mobile THEN...
        // end the function
        if ( this.windowSize.width < this.tabletBrakpoint ) return

        // Toggle the tooltip visibility variable
        this.showTooltip = !this.showTooltip
    }

    // LIFECYCLE METHODS
    public ngOnInit(): void {
        // Subscribe to the window size service observable
        this.windowSizeService.windowSizeSubject.pipe(
            takeUntil( this._destroy$ )
        ).subscribe( size => {
            // Update the window size value with the current window size
            this.windowSize = size
        })
    }

    public ngOnDestroy(): void {
        // Complete the destroy subject
        this._destroy$.next()
        this._destroy$.complete()
    }
}
