// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type { BaseHelperTextInterface } from './../helper-text/helper-text.definitions'

// Types
type BaseInputEventType = EventEmitter<{ value: BaseInputInterface[ 'value' ] }>

type BaseInputTypeType = 'text' | 'email' | 'tel'

type BaseInputVariantType = 'filled' | 'outlined'

// Interfaces
interface BaseInputInterface {
    // Required
    label: string
    value: string
    onChange: BaseInputEventType

    // Optional
    hasError?: boolean
    helperText?: BaseHelperTextInterface
    isDisabled?: boolean
    isReadOnly?: boolean
    isRequired?: boolean
    onBlur?: BaseInputEventType
    onFocus?: BaseInputEventType
    type?: BaseInputTypeType
    variant?: BaseInputVariantType
}

// Exports
export type { BaseInputInterface }
