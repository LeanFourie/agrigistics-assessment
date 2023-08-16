// Definition Imports
import type {
    CommonTableLineItemTitleInterface,
    CommonTableLineItemInterface
} from './../table-line-item/table-line-item.definitions'

// Interfaces
interface CommonTableInterface {
    // Requires
    rows: Array< CommonTableLineItemInterface >
    titles: Array< CommonTableLineItemTitleInterface >
}

// Exports
export type { CommonTableInterface }
