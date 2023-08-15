// Core Imports
import { EventEmitter } from '@angular/core'

// Interfaces
interface CommonNavItemInterface {
    // Required
    icon: string
    label: string
    onClick: EventEmitter< void >

    // Optional
    filledIcon?: boolean
}

// Exports
export type { CommonNavItemInterface }
