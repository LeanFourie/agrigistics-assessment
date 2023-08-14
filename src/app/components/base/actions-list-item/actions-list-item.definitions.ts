// Core Imports
import { EventEmitter } from '@angular/core'

// Interfaces
interface BaseActionsListItemInterface {
    // Required
    icon: string
    label: string
    onClick: EventEmitter< void >

    // Optional
    showArrow?: boolean
}

// Exports
export type { BaseActionsListItemInterface }
