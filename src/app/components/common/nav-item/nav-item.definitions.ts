// Core Imports
import { EventEmitter } from '@angular/core'

// Interfaces
interface CommonNavItem {
    icon: string
    label: string
    onClick: EventEmitter< void >
}

// Exports
export type { CommonNavItem }
