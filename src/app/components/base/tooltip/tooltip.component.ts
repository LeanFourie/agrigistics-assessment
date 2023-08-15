// Core Imports
import {
    Component,
    Input
} from '@angular/core'

// Definition Imports
import type { BaseTooltipInterface } from './tooltip.definitions'

@Component({
    selector: 'base-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: [
        './tooltip.component.scss'
    ]
})

export class TooltipComponent {
    // REQUIRED INPUTS
    /**
     * Determines whether the tooltip is visible or not
     */
    @Input() public isVisible: BaseTooltipInterface[ 'isVisible' ] = false

    /**
     * Determines the label to render inside the tooltip
     */
    @Input() public label: BaseTooltipInterface[ 'label' ] = ''
}
