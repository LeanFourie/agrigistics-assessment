// Intefaces
interface CommonPaginationInterface {
    currentPage: number
    itemsCount: number
    itemsPerPage: 50 | 75 | 100
    pagesCount: number
    visibleItems: number
}

// Exports
export type { CommonPaginationInterface }
