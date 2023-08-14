// core Imports
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'

// Definition Imports
import type { BaseActionsListItemInterface } from './actions-list-item.definitions'

@Component({
    selector: 'base-actions-list-item',
    templateUrl: './actions-list-item.component.html',
    styleUrls: [
      './actions-list-item.component.scss'
    ]
})

export class ActionsListItemComponent {
    // REQUIRED INPUTS
    /**
     * Determines the icon to render
     * 
     * @default ``
     */
    @Input() public icon: BaseActionsListItemInterface[ 'icon' ] = ''

    /**
     * Sets the label for the action item
     * 
     * @default ``
     */
    @Input() public label: BaseActionsListItemInterface[ 'label' ] = ''

    // OPTIONAL INPUTS
    /**
     * Determines whether the actions item arrow should be visible or not
     * 
     * @default false
     */
    @Input() public showArrow: BaseActionsListItemInterface[ 'showArrow' ] = false

    // REQUIRED OUTPUTS
    /**
     * Emits click events from the actions item
     */
    @Output() public onClick: BaseActionsListItemInterface[ 'onClick' ] = new EventEmitter()

    // METHODS
    /**
     * Handle click events on the actions item
     */
    public handleClick = (): void => {
        this.onClick.emit()
    }
}
