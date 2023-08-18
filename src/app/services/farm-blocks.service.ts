// Core Imports
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

// Definition Imports
import type { FarmBlockInterface } from './../definitions/interfaces'
import type { SortOrderType } from './../definitions/types'
import type { CommonTableInterface } from './../components/common/table/table.defnitions'

@Injectable({
    providedIn: 'root'
})

export class FarmBlocksService {
    // PUBLIC SUBJECTS
    /**
     * Saves the selected farm
     */
    public selectedFarm$: BehaviorSubject< string > = new BehaviorSubject( '' )

    /**
     * Saves the search keyword filters
     */
    public searchFilters$: BehaviorSubject< string[] > = new BehaviorSubject( [ '' ] )

    /**
     * Saves the toggle value to show only removed blocks
     */
    public showOnlyRemovedBlocks$: BehaviorSubject< boolean > = new BehaviorSubject( false )
    
    /**
     * Saves the sort order
     */
    public sortOrder$: BehaviorSubject< SortOrderType > = new BehaviorSubject< SortOrderType >( 'unset' )

    /**
     * Saves the block values to render
     */
    public workingData$: BehaviorSubject< CommonTableInterface[ 'rows' ] > =  new BehaviorSubject< CommonTableInterface[ 'rows' ] >( [] )

    // CONSTRUCTOR
    constructor( private _http: HttpClient ) {}

    // PUBLIC VARIABLES
    public availableFarms: Array<{ label: string }> = []

    public blocksData: CommonTableInterface[ 'rows' ] = []

    public sortBy: string = ''

    public tableTitles: CommonTableInterface[ 'titles' ] = [
        {
            value: 'Status',
            isSortable: true,
            sortedBy: undefined
        },
        {
            value: 'Block',
            isSearchable: true,
            isSortable: true,
            sortedBy: undefined
        },
        {
            value: 'Farm',
            isSearchable: true,
            isSortable: true,
            sortedBy: undefined
        },
        {
            value: 'Variant',
            isSearchable: true,
            isSortable: true,
            sortedBy: undefined
        },
        {
            value: 'Ha',
            isSearchable: true,
            isSortable: true,
            sortedBy: undefined
        },
        {
            value: 'Created',
            isSortable: true,
            sortedBy: undefined
        },
        {
            value: 'Removed',
            isSortable: true,
            sortedBy: undefined
        }
    ]

    public emptyStateData: CommonTableInterface[ 'rows' ] = [
        {
            titles: this.tableTitles.map( _ => '' ),
            cells: [
                { value: 'No data' },
                { value: '', hideOnMobile: true },
                { value: '', hideOnMobile: true },
                { value: '', hideOnMobile: true },
                { value: '', hideOnMobile: true },
                { value: '', hideOnMobile: true },
                { value: '', hideOnMobile: true }
            ]
        },
        {
            titles: this.tableTitles.map( _ => '' ),
            cells: [
                { value: '', hideOnMobile: true },
                { value: '', hideOnMobile: true },
                { value: '', hideOnMobile: true },
                { value: '', hideOnMobile: true },
                { value: '0' },
                { value: '', hideOnMobile: true },
                { value: '', hideOnMobile: true }
            ]
        }
    ]

    // METHODS
    /**
     * Fetches the data from the JSON file
     * 
     * @returns 
     */
    public getData() {
        // Return the data as a subscription
        return this._http.get< Array< FarmBlockInterface > >( '/assets/data/blocks.json' )
    }
}
