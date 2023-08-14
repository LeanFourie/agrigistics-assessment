// Defintion Imports
import { SemanticColorType } from './../../../definitions/types'

// Interfaces
interface BaseHelperTextInterface {
    // Required
    label: string

    // Optional
    icon?: string
    state?: 'default' | SemanticColorType
}

// Exports
export type { BaseHelperTextInterface }
