// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type { BaseActionsListItemInterface } from './../../base/actions-list-item/actions-list-item.definitions'

// Interfaces
interface CommonActionsListInterface {
    // Required
    actions: Array<
        Omit<
            BaseActionsListItemInterface,
            'onClick' | 'showArrow'
        >
    >
    onActionClick: EventEmitter< void >

    // Optional
    showArrow?: BaseActionsListItemInterface[ 'showArrow' ]
}

// Exports
export type { CommonActionsListInterface }
