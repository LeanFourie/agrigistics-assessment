// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type { CommonActionsListInterface } from './../../common/actions-list/actions-list.definitions'
import type { BaseHelperTextInterface } from './../helper-text/helper-text.definitions'
import type { FormFieldVariantType } from './../../../definitions/types'

// Interfaces
interface BaseDropdownInterface {
    // Required
    onChange: EventEmitter<{ value: string }>
    label: string
    options: CommonActionsListInterface[ 'actions' ]

    // Optional
    hasError?: boolean
    helperText?: BaseHelperTextInterface
    isDisabled?: boolean
    isRequired?: boolean
    isSearchable?: boolean
    menuDirection?: 'up' | 'down'
    placeholder?: string
    value?: string
    variant?: FormFieldVariantType
}

// Exports
export type { BaseDropdownInterface }
