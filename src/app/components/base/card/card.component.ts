// Core Imports
import {
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { WindowSizeService } from './../../../services/window-size.service'
import { returnPaddingValue } from './../../../utils/utils'

// Definition Imports
import type { BaseCardInterface } from './card.definitions'
import type { SizeInterface } from './../../../definitions/interfaces'

@Component({
    selector: 'base-card',
    templateUrl: './card.component.html',
    styleUrls: [
        './card.component.scss'
    ]
})

export class CardComponent implements OnInit, OnDestroy {
    // PRIVATE SUBJECTS
    private _destroy$ = new Subject< void >()

    // OPTIONAL INPUTS
    /**
     * Determines the border radius size
     * 
     * @default `xs`
     */
    @Input() public borderRadius?: BaseCardInterface[ 'borderRadius' ] = 'xs'

    /**
     * Determines the padding size inside the card
     * 
     * @default [ 16, 24 ]
     */
    @Input() public padding?: BaseCardInterface[ 'padding' ] = [ 16, 24 ]

    /**
     * Determines the color of the card
     * 
     * @default `light`
     */
    @Input() public shade?: BaseCardInterface[ 'shade' ] = 'light'

    // CONSTRUCTOR
    constructor( private _windowSizeService: WindowSizeService ) {}

    // PUBLIC VARIABLES
    public className: string = 'card'

    public windowSize: SizeInterface = {
        width: 0,
        height: 0
    }

    // METHODS
    /**
     * Generates the required class names for the component
     * 
     * @returns A string with relevant class names
     */
    public returnClassNames = (): string => {
        return `
            ${ this.className }
            ${ this.className }--border-${ this.borderRadius }
            ${ this.className }--shade-${ this.shade }
        `
    }

    /**
     * Converts the padding input value to a REM size string value
     * 
     * @returns A string value
     */
    public calculatePadding = (): string => {
        // Check if no padding is set THEN...
        // end the function
        if ( !this.padding ) return ''

        // Check if the padding value is a number OR an array THEN...
        if ( typeof this.padding === 'number' || Array.isArray( this.padding ) ) {
            // Return the converted padding value as a string
            return returnPaddingValue( this.padding )
        }

        // Create a variable to store the padding value to return
        let paddingValue: string

        // Check which window size we are on...
        switch ( true ) {
            // If we are on mobile
            case this.windowSize.width < this._windowSizeService.tabletSize.min:
                // Set the paddingValue to the mobile padding string value
                paddingValue = returnPaddingValue( this.padding.mobile )
                break
            // If we are on tablet
            case this.windowSize.width < this._windowSizeService.desktopSize.min:
                // Set the paddingValue to the tablet padding string value
                paddingValue = returnPaddingValue( this.padding.tablet )
                break
            // Set the default case as desktop
            default:
                // Set the paddingValue to the desktop padding string value
                paddingValue = returnPaddingValue( this.padding.desktop )
                break
        }

        // Return the string padding value
        return paddingValue
    }

    // LIFECYCLE METHODS
    public ngOnInit(): void {
        // Subscribe to the window size service observable
        this._windowSizeService.windowSizeSubject.pipe(
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
