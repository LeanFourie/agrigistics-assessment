// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type { CommonActionsListInterface } from './../actions-list/actions-list.definitions'
import {
    ShadeType,
    ThemeColorType
} from './../../../definitions/types'

// Interfaces
interface CommonFabInterface {
    // Required
    icon: string
    label: string

    // Optional
    actions?: CommonActionsListInterface[ 'actions' ]
    color?: ThemeColorType
    onClick?: EventEmitter< void >
    shade?: ShadeType
}

// Exports
export type { CommonFabInterface }
