// Types
type CommonTableLineItemCellType = 'text' | 'image' | 'icon'

type CommonTableLineItemStatusType = 'in-production' | 'active' | 'removed'

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
    status?: CommonTableLineItemStatusType
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
