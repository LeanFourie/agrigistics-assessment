// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type { CommonActionsListInterface } from './../actions-list/actions-list.definitions'
import type { NeutralColorType } from './../../../definitions/types'

// Interfaces
interface CommonOverflowMenuInterface {
    // Required
    actions: CommonActionsListInterface[ 'actions' ]
    onActionClick: EventEmitter< void >

    // Optional
    color?: Exclude< NeutralColorType, 'grey' >
}

// Exports
export type { CommonOverflowMenuInterface }
