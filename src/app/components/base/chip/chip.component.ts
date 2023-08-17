// Core Imports
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'

// Definition Imports
import type { BaseChipInterface } from './chip.definitions'

@Component({
    selector: 'base-chip',
    templateUrl: './chip.component.html',
    styleUrls: [
        './chip.component.scss'
    ]
})

export class ChipComponent {
    // REQUIRED INPUTS
    /**
     * Determines the label to render
     * 
     * @default ``
     */
    @Input() public label: BaseChipInterface[ 'label' ] = ''

    // OPTIONAL INPUTS
    /**
     * Determines the color of the chip
     * 
     * @default `primary`
     */
    @Input() public color?: BaseChipInterface[ 'color' ] = 'primary'

    /**
     * Determins the shade of the chip
     * 
     * @default `dark`
     */
    @Input() public shade?: BaseChipInterface[ 'shade' ] = 'dark'

    // REQUIRED OUTPUTS
    /**
     * Emits the click event from the chip component
     */
    @Output() public onClick: BaseChipInterface[ 'onClick' ] = new EventEmitter()

    // PUBLIC VARIABLES
    public className: string = 'chip'

    // METHODS
    /**
     * Handle click events on the chip button
     */
    public handleClick = (): void => {
        this.onClick.emit({
            label: this.label
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
            ${ this.className }--color-${ this.color }
            ${ this.className }--shade-${ this.shade }
        `
    }
}
