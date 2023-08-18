// Core Imports
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core'
import {
    Subject,
    combineLatest
} from 'rxjs'
import {
    switchMap,
    takeUntil
} from 'rxjs/operators'
import { FarmBlocksService } from './../../services/farm-blocks.service'
import { WindowSizeService } from './../../services/window-size.service'
import {
    defaultPaginationConfig,
    formatTableData
} from './../../utils/utils'

// Definition Imports
import type { BaseActionsListItemInterface } from './../../components/base/actions-list-item/actions-list-item.definitions'
import type { BaseToggleStateType } from './../../components/base/toggle/toggle.definitions'
import type { CommonActionsListInterface } from './../../components/common/actions-list/actions-list.definitions'
import type { CommonPaginationInterface } from './../../components/common/pagination/pagination.definitions'
import type { CommonTableLineItemTitleInterface } from './../../components/common/table-line-item/table-line-item.definitions'
import type { CommonTableInterface } from './../../components/common/table/table.defnitions'
import { FarmBlockStatusEnum } from './../../definitions/enums'
import type {
    FarmBlockInterface,
    SizeInterface
} from './../../definitions/interfaces'

@Component({
    selector: 'page-area-manager',
    templateUrl: './area-manager.component.html',
    styleUrls: [
        './area-manager.component.scss'
    ]
})

export class AreaManagerComponent implements OnInit, OnDestroy {
    // PRIVATE SUBJECTS
    private _destroy$ = new Subject< void >()

    // VIEW CHILDREN
    @ViewChild(
        'configContainer',
        { static: true }
    ) configContainerRef!: ElementRef

    // CONSTRUCTOR
    constructor(
        private _farmBlocksService: FarmBlocksService,
        private _windowSizeService: WindowSizeService
    ) {}

    // PUBLIC VARIABLES
    public windowSize: SizeInterface = {
        width: 0,
        height: 0
    }

    public tabletBrakpoint: number = this._windowSizeService.tabletSize.max

    public farms: Array<
        Omit<
            BaseActionsListItemInterface,
            'onClick'
        >
    > = []

    public selectedFarm: string = ''

    public searchTerm: string = ''

    public searchTerms: Array< string > = []

    public tableTitles: CommonTableInterface[ 'titles' ] = this._farmBlocksService.tableTitles

    public tableRows: CommonTableInterface[ 'rows' ] = []

    public pagination: CommonPaginationInterface = defaultPaginationConfig

    public fabActions: CommonActionsListInterface[ 'actions' ] = [
        { label: 'Add Farm' },
        { label: 'Add Block' }
    ]

    // METHODS
    /**
     * Handle generic click events
     */
    public handleGenericClick = (): void => {
        console.log( 'Clicked' )
    }

    /**
     * Handle dropdown value changes on the farm selection dropdown
     * 
     * @param farm - The farm label
     */
    public handleFarmSelection = ( farm: { value: string } ): void => {
        // Update the selected farm subject value
        this._farmBlocksService.selectedFarm$.next( farm.value )
    }

    /**
     * Handle search input value changes
     * 
     * @param term - The value from the search input
     */
    public handleSearchValueChange = ( term: { value: string } ): void => {}

    /**
     * Handle enter keyup events on the search input
     * 
     * @param term - The value of the search input
     */
    public handleSearchEnter = ( term: { value: string } ): void => {
        // Check if the word is already present in the search terms THEN...
        // end the function
        if ( this.searchTerms.includes( term.value ) ) return

        // Add the word to the search terms
        this.searchTerms.push( term.value )

        // Update the search filters subject with the new search terms
        this._farmBlocksService.searchFilters$.next( this.searchTerms )
    }

    /**
     * Handle click events on the toggle filter
     * 
     * @param toggleState - The current `on` or `off` state of the toggle
     */
    public handleToggleChange = ( toggleState: { state: BaseToggleStateType } ): void => {
        // Update the toggle filter subject value base on the toggle filter state
        this._farmBlocksService.showOnlyRemovedBlocks$.next(
            toggleState.state === 'on' ? true : false
        )
    }

    /**
     * Handle click events on the search filter chips
     * 
     * @param value - The label value of the chip
     */
    public handleChipClick = ( value: { label: string }): void => {
        // Remove the chip from the search terms
        this.searchTerms = this.searchTerms.filter( term => term !== value.label )

        // Update the search filters subject with the new search terms
        this._farmBlocksService.searchFilters$.next( this.searchTerms )
    }

    /**
     * Handle click events on the table serahc buttons
     */
    public handleTableSearchClick = (): void => {
        // Get the search and filters items parent container
        const configContainerElement: HTMLElement = this.configContainerRef.nativeElement

        // Get the search component from the parent container
        const searchContainerElement = configContainerElement.children[ 1 ] as HTMLElement

        // Get the input element inside the search component
        const inputElement = searchContainerElement.getElementsByTagName( 'input' )[ 0 ]

        // Focus on the input element
        inputElement.focus()
    }

    /**
     * Handle click events on the table sort buttons
     * 
     * @param sortLabel - The label value of the cell in which the sort button is nested
     */
    public handleTableSortClick = ( sortLabel: string ): void => {
        // Get the label value in lowercase
        const label: string = sortLabel.toLowerCase()

        // Save the label value in the service
        this._farmBlocksService.sortBy = label

        // Get the selected title from the service
        const selectedTitle: CommonTableLineItemTitleInterface = this._farmBlocksService.tableTitles.find( title => title.value === sortLabel )!

        // Loop through the titles and set the their `sortedBy` value to false
        this._farmBlocksService.tableTitles.forEach( title => {
            if ( title.isSortable ) title.sortedBy = undefined
        })

        // Update the sort by and sort order values based on the amount of clicks
        switch ( true ) {
            case this._farmBlocksService.sortOrder$.value === 'unset':
                this._farmBlocksService.sortOrder$.next( 'asc' )
                selectedTitle.sortedBy = 'asc'
                break
            case this._farmBlocksService.sortOrder$.value === 'asc':
                this._farmBlocksService.sortOrder$.next( 'desc' )
                selectedTitle.sortedBy = 'desc'
                break
            default:
                this._farmBlocksService.sortOrder$.next( 'unset' )
                this._farmBlocksService.sortBy = ''
                break
        }
    }

    // LIFECYCLE METHODS
    public ngOnInit(): void {
        // Subscribe to the window size service observable
        this._windowSizeService.windowSizeSubject.pipe(
            takeUntil( this._destroy$ )
        ).subscribe( size => {
            // Update the window size value with the current window size
            this.windowSize = size
        })

        // Subscribe to the data
        this._farmBlocksService.getData().pipe(
            takeUntil( this._destroy$ )
        ).subscribe(data => {
            // Create a new set to store the unique farm names
            const uniqueFarms = new Set()
        
            // Loop through the farms and save their names to the service
            this._farmBlocksService.availableFarms = data.map( entry => ({ label: entry.farmName })).filter( farm => {
                // Check if the farm is NOT in the unique farms set THEN...
                if ( !uniqueFarms.has( farm.label ) ) {
                    // Add it to the unique farms set
                    uniqueFarms.add( farm.label )

                    return true
                }

                return false
            })
        
            // Set the farms to render in the dropdown
            this.farms = this._farmBlocksService.availableFarms
        })

        // Create a combined stream set to update the visible data
        const combinedStream$ = combineLatest([
            this._farmBlocksService.showOnlyRemovedBlocks$,
            this._farmBlocksService.searchFilters$,
            this._farmBlocksService.sortOrder$,
            this._farmBlocksService.getData()
        ])
        
        // Subscribe tp the selected farms subscription
        this._farmBlocksService.selectedFarm$.pipe(
            takeUntil( this._destroy$ ),
            switchMap( farm => {
                // Check if NO farm is selected THEN...
                if ( !farm || farm === '' ) {
                    // Empty the table
                    this.tableRows = this._farmBlocksService.emptyStateData

                    // Return an empty array
                    return []
                }
            
                // Set the selected farm to the current farm
                this.selectedFarm = farm

                // Subscribe to the combined stream
                return combinedStream$
            }),
        ).subscribe(([
            showOnlyRemovedBlocks,
            searchFilters,
            sortOrder,
            blocksData
        ]) => {
            // Get the blocks data to render
            let renderData: Array< FarmBlockInterface > = blocksData

            // Check if only removed blocks should show THEN...
            if ( showOnlyRemovedBlocks ) {
                // Remove all blocks that are not 'removed'
                renderData = renderData.filter( entry => entry.status === FarmBlockStatusEnum.Complete )
            }

            // Remove empty strings from the search terms
            this.searchTerms = searchFilters.filter( term => term !== '' )

            // Check if any search terms are used
            if ( this.searchTerms.length > 0 ) {
                // Filter out the data to show only ones matching the search terms
                renderData = renderData.filter( entry => {
                    return Object.values( entry ).some( value => {
                        if ( value !== null ) {
                            return this.searchTerms.some( term => value.toString().toLowerCase().includes( term.toLowerCase() ) )
                        }

                        return false
                    })
                })
            }

            // Generate the table data in the correct format
            let tableData: CommonTableInterface[ 'rows' ] = formatTableData(
                renderData.filter( entry => entry.farmName === this.selectedFarm ),
                this.tableTitles
            )

            // Create a variable to store the blocks total HA size
            let blocksTotalSize: number = 0

            // Loop through the data and calculate the blocks total HA size
            renderData.forEach( entry => {
                if ( entry.farmName === this.selectedFarm ) {
                    blocksTotalSize += entry.size
                }
            })
            
            // Check if the sort order is not set to `unset`
            if ( sortOrder !== 'unset' ) {
                // Get the index position of the cell title on which to sort
                const titleIndex = tableData[ 0 ].titles.findIndex( title => title.toLowerCase() === this._farmBlocksService.sortBy )

                // Sort the data according to the sort criteria
                tableData = [ ...tableData ].sort(( a, b ) => {
                    const objectA = a.cells[ titleIndex ]?.value || ''
                    const objectB = b.cells[ titleIndex ]?.value || ''
                    
                    const sortOrder = this._farmBlocksService.sortOrder$.value
                    return sortOrder === 'asc'
                            ? objectA.localeCompare( objectB )
                            : objectB.localeCompare( objectA )
                })
            }

            // Set the pagination `itemsCount` value
            this.pagination.itemsCount = tableData.length

            // Set the pagination `visibleItems` value
            this.pagination.visibleItems = tableData.length

            // Add the last row with only the blocks total HA size to the table data
            tableData.push({
                titles: this.tableTitles.map( title => title.value ),
                cells: [ ...Array( 7 ) ].map(( _, index ) => {
                    if ( index === 4 ) return { value: blocksTotalSize.toFixed( 2 ).toString() }

                    return {
                        value: '',
                        hideOnMobile: true
                    }
                })
            })

            // Save the complete dataset to the service
            this._farmBlocksService.blocksData = tableData

            // Save the updated dataset to the working data in the service
            this._farmBlocksService.workingData$.next( tableData )
        })

        // Subscribe to the working fata
        this._farmBlocksService.workingData$.pipe(
            takeUntil( this._destroy$ )
        ).subscribe( data => {
            // Check that a farm is selected THEN save the data to the table rows to render
            if ( this.selectedFarm ) this.tableRows = data
        })
    }

    // LIFECYCLE METHODS
    public ngOnDestroy(): void {
        // Complete the destroy subject
        this._destroy$.next()
        this._destroy$.complete()
    }
}
