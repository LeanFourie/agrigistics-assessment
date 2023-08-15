// Core imports
import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core'

// Deinition Imports
import type { CommonActionsListInterface } from './actions-list.definitions'
@Component({
    selector: 'common-actions-list',
    templateUrl: './actions-list.component.html',
    styleUrls: [
        './actions-list.component.scss'
    ]
})

export class ActionsListComponent {
    // REQUIRED INPUTS
    /**
     * Determines the actions that should be rendered in the list
     * 
     * @default []
     */
    @Input() public actions: CommonActionsListInterface[ 'actions' ] = []

    // OPTIONAL INPUTS
    /**
     * Determines whether the action items should have a trailing arrow or not
     * 
     * @default false
     */
    @Input() public showArrow?: CommonActionsListInterface[ 'showArrow' ] = false

    // REQUIRED OUTPUTS
    /**
     * Emits click events from the action items
     */
    @Output() public onActionClick: CommonActionsListInterface[ 'onActionClick' ] = new EventEmitter

    // METHODS
    /**
     * Handles click events on the action items
     */
    public handleActionClick = (): void => {
        // Emit the click event from the action item
        this.onActionClick.emit()
    }
}
