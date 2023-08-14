// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import {
    SemanticColorType,
    ShadeType,
    SizeType,
    ThemeColorType
} from './../../../definitions/types'

// Types
type BaseButtonVariantType = 'filled' | 'outlined' | 'ghost'

// Interfaces
interface BaseButtonInterface {
    // Required
    label: string
    onClick: EventEmitter< void >

    // Optional
    color?: ThemeColorType | Exclude<
        SemanticColorType,
        'info' | 'success' | 'warning'
    >
    icons?: [
        string?,
        string?
    ]
    isDisabled?: boolean
    isLoading?: boolean
    shade?: ShadeType
    showLabel?: boolean
    size?: SizeType
    variant?: BaseButtonVariantType
}

// Exports
export type { BaseButtonInterface }
