// Core Imports
import { EventEmitter } from '@angular/core'

// Types
type BaseToggleStateType = 'on' | 'off'

// Interfaces
interface BaseToggleInterface {
    // required
    label: string
    onClick: EventEmitter<{ state: BaseToggleStateType }>

    // Optional
    isDisabled: boolean
    showLabel: boolean
    state?: BaseToggleStateType
}

// Exports
export type { BaseToggleInterface }
