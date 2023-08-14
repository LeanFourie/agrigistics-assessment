// Core Imports
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'

// Definition Imports
import type { BaseToggleInterface } from './toggle.definitions'

@Component({
    selector: 'base-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: [
        './toggle.component.scss'
    ]
})

export class ToggleComponent {
    // REQUIRED INPUTS
    /**
     * Determines the label to render to the toggle and as the aria-label
     * 
     * @default ``
     */
    @Input() public label: BaseToggleInterface[ 'label' ] = ''

    // OPTIONAL INPUTS
    /**
     * Determines whether the toggle is disabled ot not
     * 
     * @default false
     */
    @Input() public isDisabled?: BaseToggleInterface[ 'isDisabled' ] = false

    /**
     * Determines whether the label is visible with the toggle or not
     * 
     * @default false
     */
    @Input() public showLabel?: BaseToggleInterface[ 'showLabel' ] = false

    /**
     * Determines the state of the toggle
     * 
     * @default `off`
     */
    @Input() public state?: BaseToggleInterface[ 'state' ] = 'off'

    // REQUIRED OUTPUTS
    /**
     * Emit click events from the toggle
     */
    @Output() public onClick: BaseToggleInterface[ 'onClick' ] = new EventEmitter()

    // PUBLIC VARIABLES
    public className: string = 'toggle'

    // METHODS
    /**
     * Handle click events on the toggle
     */
    public handleClick = (): void => {
        // Toggle the state of the toggle
        this.state = this.state === 'off' ? 'on' : 'off'

        // Emit the state value
        this.onClick.emit({
            state: this.state!
        })
    }

    /**
     * Generates the required class names for the component
     * 
     * @returns A string with relevant class names
     */
    public returnClassNames = (): string => {
        return `
            ${ this.className }
            ${ this.className }--state-${ this.state }
            ${ this.isDisabled ? `${ this.className }--is-disabled` : '' }
        `
    }
}
