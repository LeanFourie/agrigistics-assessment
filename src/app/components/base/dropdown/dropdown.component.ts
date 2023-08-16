// Core Imports
import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output
} from '@angular/core'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

// Definition Imports
import type { BaseDropdownInterface } from './dropdown.definitions'

@Component({
    selector: 'base-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: [
        './dropdown.component.scss'
    ]
})

export class DropdownComponent implements OnInit {
    // SUBJECTS
    private _debouncer: Subject< string > = new Subject< string >()

    // REQUIRED INPUTS
    /**
     * Determines the label of the dropdown
     * 
     * @default ``
     */
    @Input() public label: BaseDropdownInterface[ 'label' ] = ''

    /**
     * Determines the value options for the dropdown
     * 
     * @default []
     */
    @Input() public options: BaseDropdownInterface[ 'options' ] = []

    // OPTIONAL INPUTS
    /**
     * Determines whether the dropdown has errors or not
     * 
     * @default false
     */
    @Input() public hasError?: BaseDropdownInterface[ 'hasError' ] = false

    /**
     * Adds optional helper text to the dropdown
     * 
     * @default undefined
     */
    @Input() public helperText?: BaseDropdownInterface[ 'helperText' ]

    /**
     * Determines whether the dropdown is disabled or not
     * 
     * @default false
     */
    @Input() public isDisabled?: BaseDropdownInterface[ 'isDisabled' ] = false

    /**
     * Determines whether the dropdown is required or not
     * 
     * @default false
     */
    @Input() public isRequired?: BaseDropdownInterface[ 'isRequired' ] = false

    /**
     * Determines whether a user can filter the dropdown results or not
     * 
     * @default false
     */
    @Input() public isSearchable?: BaseDropdownInterface[ 'isSearchable' ] = false

    /**
     * Determines the placeholder text to be rendered
     * 
     * @default undefined
     */
    @Input() public placeholder?: BaseDropdownInterface[ 'placeholder' ]

    /**
     * Determines the value to render for the dropdown
     * 
     * @default ``
     */
    @Input() public value?: BaseDropdownInterface[ 'value' ] = ''

    /**
     * Determines the variant of dropdown to render
     * 
     * @default `filled`
     */
    @Input() public variant?: BaseDropdownInterface[ 'variant' ] = 'filled'

    // REQUIRED OUTPUS
    /**
     * Emits the change event from the dropdown
     */
    @Output() public onChange: BaseDropdownInterface[ 'onChange' ] = new EventEmitter()

    // CONSTRUCTOR
    constructor( private elementRef: ElementRef ) {}

    // PUBLIC VARIABLES
    public className: string = 'dropdown'
    public isInFocus: boolean = false
    public filteredOptions: BaseDropdownInterface[ 'options' ] = []
    public searchTerm: string = ''

    // HOST LISTENERS
    /**
     * Close the menu when a click occurs outside the component
     */
    @HostListener( 'document:click', [ '$event' ] )
    public handleDocumentClick( event: Event ): void {
        // Detect whether the click event is inside the overflow component
        const clickedInside: boolean = this.elementRef.nativeElement.contains( event.target )

        // If the click event is outside of the component hide the menu
        if ( !clickedInside ) this.isInFocus = false
    }

    // METHODS
    /**
     * Handles value changes on the input
     * 
     * @param inputValue 
     */
    public handleChange = ( inputValue: { value: string } ): void => {
        // Check if search is NOT allowed THEN...
        // end the function
        if ( !this.isSearchable ) return

        // Set the search text valyue to the value of the input
        const searchText = inputValue.value
    
        // Check if we have entered the minimum amount ot characters THEN...
        if ( searchText.length >= 3 ) {
            // Debounce the input using a debounce time of 300ms and update the search term
            this._debouncer.next( searchText )
        } else {
            // Clear the filtered options array
            this.filteredOptions = []

            // Empty the search term value
            this.searchTerm = ''
        }
    }

    /**
     * Handle focus events on the input element
     */
    public handleFocus = (): void => {
        // Set the focus state to true
        this.isInFocus = true
    }

    public handleOptionSelect = ( option: { selectedAction: string } ): void => {
        this.value = option.selectedAction

        // Emit the new value of the dropdown on change
        this.onChange.emit({
            value: this.value!
        })

        this.isInFocus = false
    }

    /**
     * Generates the required class names for the component
     * 
     * @returns A string with relevant class names
     */
    public returnClassNames = (): string => {
        return `
            ${ this.className }
            ${ this.className }--variant-${ this.variant }
            ${ this.hasError ? `${ this.className }--has-error` : '' }
            ${ this.value !== '' ? `${ this.className }--has-value` : '' }
            ${ this.isDisabled ? `${ this.className }--is-disabled` : '' }
            ${ this.isInFocus ? `${ this.className }--is-focussed` : '' }
            ${ this.isSearchable ? `${ this.className }--is-searchable` : '' }
        `
    }

    // LIFECYCLE METHODS
    public ngOnInit(): void {
        // Subscribe on the input value changes with a debounce
        this._debouncer.pipe(
            debounceTime( 300 )
        ).subscribe(( searchText: string ) => {
            // Check if search is NOT allowed THEN...
            // end the function
            if ( !this.isSearchable ) return

            // Update the search term with the new value
            this.searchTerm = searchText

            // Filter the options using the search term
            this.filteredOptions = this.options.filter( option =>
                option.label.toLowerCase().includes( searchText.toLowerCase() )
            )
        })
    }
}
