// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type { CommonActionsListInterface } from './../actions-list/actions-list.definitions'
import type { FormFieldVariantType } from './../../../definitions/types'

// Interfaces
interface CommonSearchInterface {
    // Required
    onChange: EventEmitter<{ value: string }>

    // Optional
    placeholder?: string
    searchResults?: CommonActionsListInterface[ 'actions' ]
    value?: string
    variant?: FormFieldVariantType
}

// Exports
export type { CommonSearchInterface }
