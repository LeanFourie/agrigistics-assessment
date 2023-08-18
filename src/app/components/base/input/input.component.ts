// Core Imports
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'

// Definition Imports
import type { BaseInputInterface } from './input.definitions'

@Component({
    selector: 'base-input',
    templateUrl: './input.component.html',
    styleUrls: [
        './input.component.scss'
    ]
})

export class InputComponent {
    // REQUIRED INPUTS
    /**
     * Determines the label of the input
     * 
     * @default ``
     */
    @Input() public label: BaseInputInterface[ 'label' ] = ''

    /**
     * Determines the value of the input element
     * 
     * @default ``
     */
    @Input() public value: BaseInputInterface[ 'value' ] = ''

    // OPTIONAL INPUTS
    /**
     * Determines whether the input has errors or not
     * 
     * @default false
     */
    @Input() public hasError?: BaseInputInterface[ 'hasError' ] = false

    /**
     * Adds optional helper text to the input
     * 
     * @default undefined
     */
    @Input() public helperText?: BaseInputInterface[ 'helperText' ]

    /**
     * Adds optional leading icon to the input
     * 
     * @default undefined
     */
    @Input() public icon?: BaseInputInterface[ 'icon' ]

    /**
     * Determines whether the input is disabled or not
     * 
     * @default false
     */
    @Input() public isDisabled?: BaseInputInterface[ 'isDisabled' ] = false

    /**
     * Determines whether the input is read oonly or not
     * 
     * @default false
     */
    @Input() public isReadOnly?: BaseInputInterface[ 'isReadOnly' ] = false

    /**
     * Determines whether the input is required or not
     * 
     * @default false
     */
    @Input() public isRequired?: BaseInputInterface[ 'isRequired' ] = false

    /**
     * Determines the placeholder text to be rendered
     * 
     * @default undefined
     */
    @Input() public placeholder?: BaseInputInterface[ 'placeholder' ]

    /**
     * Determines the type of input element to render
     * 
     * @default `text`
     */
    @Input() public type?: BaseInputInterface[ 'type' ] = 'text'

    /**
     * Determines the variant of input to render
     * 
     * @default `filled`
     */
    @Input() public variant?: BaseInputInterface[ 'variant' ] = 'filled'

    // REQUIRED OUTPUTS
    /**
     * Emits the change event form the input element
     */
    @Output() public onChange: BaseInputInterface[ 'onChange' ] = new EventEmitter()

    // OPTIONAL OUTPUTS
    /**
     * Emits the blur event form the input element
     */
    @Output() public onBlur: BaseInputInterface[ 'onBlur' ] = new EventEmitter()

    /**
     * Emits the enter keyup event form the input element
     */
    @Output() public onEnter: BaseInputInterface[ 'onEnter' ] = new EventEmitter()

    /**
     * Emits the focus event form the input element
     */
    @Output() public onFocus: BaseInputInterface[ 'onFocus' ] = new EventEmitter()

    // PUBLIC VARIABLES
    public className: string = 'input'
    public isInFocus: boolean = false
    public inputElement?: HTMLInputElement

    // METHODS
    /**
     * Handle change events on the input element
     */
    public handleChange = ( event: Event ): void => {
        // Get the input HTML element
        const inputElement = event.currentTarget as HTMLInputElement

        // Check if the input element variable is not defined THEN
        // define the input element
        if ( !this.inputElement ) this.inputElement = inputElement

        // Get the value from the input element
        const inputValue = inputElement.value

        // Update the current value with the input value
        this.value = inputValue

        // Emit the value on change
        this.onChange.emit({
            value: this.value
        })
    }

    /**
     * Handle blur events on the input element
     */
    public handleBlur = (): void => {
        // Reset the focus state
        this.isInFocus = false

        // Check of the blur event is NOT added to the element THEN...
        // end the function
        if ( !this.onBlur ) return

        // Emit the value on blur
        this.onBlur.emit({
            value: this.value
        })
    }

    /**
     * Handle focus events on the input element
     */
    public handleFocus = (): void => {
        // Set the focus state to true
        this.isInFocus = true

        // Check of the focus event is NOT added to the element THEN...
        // end the function
        if ( !this.onFocus ) return

        // Emit the value on focus
        this.onFocus.emit({
            value: this.value
        })
    }

    /**
     * Clears the input value on click
     */
    public handleValueClear = (): void => {
        // Clear the input value
        this.value = ''

        // Emit the value on clear
        this.onChange.emit({
            value: this.value
        })
    }

    public onEnterPressed = (): void => {
        // Emit the value on focus
        this.onEnter.emit({
            value: this.value
        })

        // Clear the value
        this.value = ''

        // Empty the input element value
        if ( this.inputElement ) this.inputElement.value = ''
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
            ${ this.icon && this.icon !== '' ? `${ this.className }--has-icon` : '' }
            ${ this.value !== '' ? `${ this.className }--has-value` : '' }
            ${ this.isDisabled ? `${ this.className }--is-disabled` : '' }
            ${ this.isInFocus ? `${ this.className }--is-focussed` : '' }
            ${ this.isReadOnly ? `${ this.className }--is-readOnly` : '' }
        `
    }
}
