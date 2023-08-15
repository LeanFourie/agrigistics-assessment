// Core Imports
import { EventEmitter } from '@angular/core'

// Interfaces
interface BaseActionsListItemInterface {
    // Required
    label: string
    onClick: EventEmitter< void >

    // Optional
    icon?: string
    showArrow?: boolean
}

// Exports
export type { BaseActionsListItemInterface }
