// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type { BaseActionsListItemInterface } from './../../base/actions-list-item/actions-list-item.definitions'

// Types
type CommonActionsListWidthType = 'full' | 'fixed'

// Interfaces
interface CommonActionsListInterface {
    // Required
    actions: Array<
        Omit<
            BaseActionsListItemInterface,
            'onClick' | 'showArrow'
        >
    >
    onActionClick: EventEmitter<{ selectedAction: string }>

    // Optional
    showArrow?: BaseActionsListItemInterface[ 'showArrow' ]
    width?: CommonActionsListWidthType
}

// Exports
export type { CommonActionsListInterface }
