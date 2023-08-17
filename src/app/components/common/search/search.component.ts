// Core Imports
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'

// Definition Imports
import type { CommonSearchInterface } from './search.definitions'

@Component({
    selector: 'common-search',
    templateUrl: './search.component.html',
    styleUrls: [
        './search.component.scss'
    ]
})

export class SearchComponent {
    // OPTIONAL INPUTS
    /**
     * Determines the placeholder for the search field
     * 
     * @default undefined
     */
    @Input() public placeholder?: CommonSearchInterface[ 'placeholder' ]

    /**
     * Adds an optional actions list with interative results
     * 
     * @default undefined
     */
    @Input() public searchResults?: CommonSearchInterface[ 'searchResults' ]

    /**
     * Determines the value for the search input
     * 
     * @default ``
     */
    @Input() public value?: CommonSearchInterface[ 'value' ] = ''

    /**
     * Determines the variant of search input to render
     * 
     * @default `filled`
     */
    @Input() public variant?: CommonSearchInterface[ 'variant' ] = 'filled'

    // REQUIRED OUTPUTS
    /**
     * Emits the change event form the search input
     */
    @Output() public onChange: CommonSearchInterface[ 'onChange' ] = new EventEmitter

    /**
     * Emits the enter keyup event form the search input
     */
    @Output() public onEnter: CommonSearchInterface[ 'onEnter' ] = new EventEmitter

    // PUBLIC VARIABLES
    public isInFocus: boolean = false

    // METHODS
    /**
     * Handles change events on the search input
     */
    public handleChange = ( text: { value: string } ): void => {
        // Emit the search value
        this.onChange.emit({
            value: text.value
        })
    }

    public handleEnter = ( text: { value: string } ): void => {
        // Emit the search value
        this.onEnter.emit({
            value: text.value
        })
    }

    /**
     * Handle focus events on the input element
     */
    public handleFocus = (): void => {
        // Set the focus state to true
        this.isInFocus = true
    }
}
