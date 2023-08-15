// Core Imports
import {
    Component,
    Input
} from '@angular/core'

// Definition Imports
import type { CommonPaginationInterface } from './pagination.definitions'

@Component({
    selector: 'common-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: [
        './pagination.component.scss'
    ]
})

export class PaginationComponent {
    // REQUIRED INPUTS
    /**
     * Sets the current page
     * 
     * @default 1
     */
    @Input() public currentPage: CommonPaginationInterface[ 'currentPage' ] = 1

    /**
     * Determines the total amount of items in the dataset
     * 
     * @default 0
     */
    @Input() public itemsCount: CommonPaginationInterface[ 'itemsCount' ] = 0

    /**
     * Determines the amount of items to show per page
     * 
     * @default 50
     */
    @Input() public itemsPerPage: CommonPaginationInterface[ 'itemsPerPage' ] = 50

    /**
     * Determines the amount of pages the user can page through
     * 
     * @default 1
     */
    @Input() public pagesCount: CommonPaginationInterface[ 'pagesCount' ] = 1

    /**
     * Determines the amount of items currently visible
     * 
     * @default 0
     */
    @Input() public visibleItems: CommonPaginationInterface[ 'visibleItems' ] = 0

    // PUBLIC VARIABLES
    public itemsPerPageOptions: Array<{ label: string }> = [
        { label: '50' },
        { label: '75' },
        { label: '100' }
    ]

    // METHODS
    /**
     * Sets the new items per page value
     */
    public setItemsPerPage = (): void => {

    }

    /**
     * Moves to the new page by incrementing or decremnting the current page value
     * 
     * @param newPagePosition - The direction in which to navigate
     */
    public handlePageChange = ( newPagePosition: 1 | -1 ): void => {
        console.log( newPagePosition )
    }
}
