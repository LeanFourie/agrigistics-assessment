// Core Imports
import { EventEmitter } from '@angular/core'

// Definition Imports
import type { CommonPaginationInterface } from './../pagination/pagination.definitions'
import type {
    CommonTableLineItemTitleInterface,
    CommonTableLineItemInterface
} from './../table-line-item/table-line-item.definitions'

// Interfaces
interface CommonTableInterface {
    // Required
    onSearchClick: EventEmitter< void >
    onSortClick: EventEmitter< string >
    pagination: CommonPaginationInterface
    rows: Array< CommonTableLineItemInterface >
    titles: Array< CommonTableLineItemTitleInterface >
}

// Exports
export type { CommonTableInterface }
