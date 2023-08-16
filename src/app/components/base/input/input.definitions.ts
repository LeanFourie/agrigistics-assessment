// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type { BaseHelperTextInterface } from './../helper-text/helper-text.definitions'
import type { FormFieldVariantType } from './../../../definitions/types'

// Types
type BaseInputEventType = EventEmitter<{ value: BaseInputInterface[ 'value' ] }>

type BaseInputTypeType = 'text' | 'email' | 'tel' | 'search'

// Interfaces
interface BaseInputInterface {
    // Required
    label: string
    value: string
    onChange: BaseInputEventType

    // Optional
    hasError?: boolean
    helperText?: BaseHelperTextInterface
    icon?: string
    isDisabled?: boolean
    isReadOnly?: boolean
    isRequired?: boolean
    onBlur: BaseInputEventType
    onFocus: BaseInputEventType
    placeholder?: string
    type?: BaseInputTypeType
    variant?: FormFieldVariantType
}

// Exports
export type { BaseInputInterface }
