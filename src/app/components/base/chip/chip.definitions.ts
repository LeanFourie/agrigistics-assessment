// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type {
    SemanticColorType,
    ShadeType,
    ThemeColorType
} from './../../../definitions/types'

// Interfaces
interface BaseChipInterface {
    // Required
    label: string
    onClick: EventEmitter< void >

    // Optional
    color: ThemeColorType | Exclude<
        SemanticColorType,
        'info' | 'success' | 'warning'
    >
    shade: ShadeType
}

// Exports
export type { BaseChipInterface }
