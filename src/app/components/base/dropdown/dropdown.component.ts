// Core Imports
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'

// Definition Imports
import type { BaseDropdownInterface } from './dropdown.definitions'

@Component({
    selector: 'base-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: [
        './dropdown.component.scss'
    ]
})

export class DropdownComponent {
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

    // PUBLIC VARIABLES
    public className: string = 'dropdown'
    public isInFocus: boolean = false

    // METHODS
    /**
     * Handles change events on the dropdown
     */
    public handleChange = ( event: { value: string } ): void => {
        // Emit the new value of the dropdown on change
        this.onChange.emit({
            value: this.value!
        })
    }

    /**
     * Handle focus events on the input element
     */
    public handleFocus = (): void => {
        // Set the focus state to true
        this.isInFocus = true
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
        `
    }
}
