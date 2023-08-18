// Core Imports
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'

// Definition Imports
import type { BaseButtonInterface } from './button.definitions'
import type { BaseTextInterface } from './../text/text.definitions'

@Component({
    selector: 'base-button',
    templateUrl: './button.component.html',
    styleUrls: [
        './button.component.scss'
    ]
})

export class ButtonComponent {
    // REQUIRED INPUTS
    /**
     * Determines the label to be rendered inside the button and as the aria-label
     * 
     * @default ``
     */
    @Input() public label: BaseButtonInterface[ 'label' ] = ''

    // OPTIONAL INPUTS
    /**
     * Determines the color of the button
     * 
     * @default `primary`
     */
    @Input() public color?: BaseButtonInterface[ 'color' ] = 'primary'

    /**
     * Adds icons to the button. The first item adds an icon to the left, the second to the right
     * 
     * @default undefined
     */
    @Input() public icons?: BaseButtonInterface[ 'icons' ]

    /**
     * Determines whether the button is disabled or not
     * 
     * @default false
     */
    @Input() public isDisabled?: BaseButtonInterface[ 'isDisabled' ] = false

    /**
     * Determines whether the button is loading or not
     * 
     * @default false
     */
    @Input() public isLoading?: BaseButtonInterface[ 'isLoading' ] = false

    /**
     * Determines the shade of the button
     * 
     * @default `dark`
     */
    @Input() public shade?: BaseButtonInterface[ 'shade' ] = 'dark'

    /**
     * Determines whether the label is rendered inside the button
     * 
     * @default true
     */
    @Input() public showLabel?: BaseButtonInterface[ 'showLabel' ] = true

    /**
     * Determines the size of the button
     * 
     * @default `md`
     */
    @Input() public size?: BaseButtonInterface[ 'size' ] = 'md'

    /**
     * Determines whether the button is of filled, outlined or ghost type
     * 
     * @default `filled`
     */
    @Input() public variant?: BaseButtonInterface[ 'variant' ] = 'filled'

    // REQUIRED OUTPUTS
    /**
     * Emits the click event from the button component
     */
    @Output() public onClick: BaseButtonInterface[ 'onClick' ] = new EventEmitter()

    // PUBLIC VARIABLES
    public className: string = 'button'
    public labelVariant = `label ${ this.size! }` as BaseTextInterface[ 'variant' ]

    // METHODS
    /**
     * Handle click events on the button
     */
    public handleClick = (): void => {
        this.onClick.emit()
    }

    /**
     * Checks which type of button to render based on the `showLabel` and `icons` inputs
     * 
     * @returns A string to determine the type
     */
    public getButtonType = (): string => {
        // Create a variable to store the button type
        let buttonType: string

        // Create a switch statement to get the correct type
        switch ( true ) {
            // If the label is visible and no icons are set
            case this.showLabel && ( !this.icons || this.icons && this.icons.length < 1 ):
                // Set the type to `text`
                buttonType = 'text'
                break
            // If the label is visible and some icons are set
            case this.showLabel && this.icons && this.icons.length >= 1:
                // Set the type to `text-icon`
                buttonType = 'text-icon'
                break
            // If no label is visible and some icons are set
            case !this.showLabel && this.icons && this.icons.length >= 1:
                // Set the type to `icon`
                buttonType = 'icon'
                break
            default:
                // Set the default type to `text`
                buttonType = 'text'
                break
        }

        // Return the button type
        return buttonType
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
            ${ this.className }--size-${ this.size }
            ${ this.className }--type-${ this.getButtonType() }
            ${ this.className }--variant-${ this.variant }
            ${ this.isDisabled ? `${ this.className }--is-disabled` : '' }
            ${ this.isLoading ? `${ this.className }--is-loading` : '' }
            ${ this.showLabel ? `${ this.className }--show-label` : '' }
        `
    }
}
