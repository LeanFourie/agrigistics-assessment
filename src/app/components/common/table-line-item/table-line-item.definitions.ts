// Definition Imports
import { FarmBlockStatusEnum } from './../../../definitions/enums'

// Types
type CommonTableLineItemCellType = 'text' | 'image' | 'icon'

// Interfaces
interface CommonTableLineItemInterface {
    // Required
    cells: Array<
        CommonTableLineItemCellInterface |
        CommonTableLineItemTitleInterface 
    >
    titles: Array< string >

    // Optional
    isTitlesRow?: boolean
    status?: FarmBlockStatusEnum
}

interface CommonTableLineItemCellInterface {
    // Required
    value: string

    // Optional
    hideOnMobile?: boolean
    type?: CommonTableLineItemCellType
}

interface CommonTableLineItemTitleInterface extends CommonTableLineItemCellInterface {
    // Required
    isSearchable?: boolean
    isSortable?: boolean
}

// Exports
export type {
    CommonTableLineItemCellInterface,
    CommonTableLineItemInterface,
    CommonTableLineItemTitleInterface
}
