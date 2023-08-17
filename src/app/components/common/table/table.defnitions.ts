// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type {
    CommonTableLineItemTitleInterface,
    CommonTableLineItemInterface
} from './../table-line-item/table-line-item.definitions'

// Interfaces
interface CommonTableInterface {
    // Required
    onSearchClick: EventEmitter< void >
    rows: Array< CommonTableLineItemInterface >
    titles: Array< CommonTableLineItemTitleInterface >
}

// Exports
export type { CommonTableInterface }
