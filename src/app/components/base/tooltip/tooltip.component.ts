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
     * Determines the label to render inside the tooltip
     */
    @Input() public label: BaseTooltipInterface[ 'label' ] = ''
}
