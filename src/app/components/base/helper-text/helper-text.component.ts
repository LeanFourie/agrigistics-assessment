// Core Imports
import {
    Component,
    Input
} from '@angular/core'

// Definition Imports
import type { BaseHelperTextInterface } from './helper-text.definitions'

@Component({
    selector: 'base-helper-text',
    templateUrl: './helper-text.component.html',
    styleUrls: [
        './helper-text.component.scss'
    ]
})

export class HelperTextComponent {
    // REQUIRED INPUTS
    /**
     * Determines the label value of the helper text
     * 
     * @default ``
     */
    @Input() public label: BaseHelperTextInterface[ 'label' ] = ''

    // OPTIONAL INPUTS
    /**
     * Adds an icon to the helper text element
     * 
     * @default undefined
     */
    @Input() public icon?: BaseHelperTextInterface[ 'icon' ]

    /**
     * Determines the state of the helper text
     * 
     * @default `default`
     */
    @Input() public state?: BaseHelperTextInterface[ 'state' ] = 'default'
}
