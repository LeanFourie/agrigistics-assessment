// Core Imports
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

// Definition Imports
import type { FarmBlockInterface } from './../definitions/interfaces'
import type { CommonTableInterface } from './../components/common/table/table.defnitions'

@Injectable({
    providedIn: 'root'
})

export class FarmBlocksService {
    public selectedFarm$: BehaviorSubject< string > = new BehaviorSubject( '' )
    public searchFilters$: BehaviorSubject< string[] > = new BehaviorSubject( [ '' ] )
    public showOnlyRemovedBlocks$: BehaviorSubject< boolean > = new BehaviorSubject( false )
    public workingData$: BehaviorSubject< any > =  new BehaviorSubject( [] )

    constructor( private _http: HttpClient ) {}

    public availableFarms: Array<{ label: string }> = []

    public blocksData: CommonTableInterface[ 'rows' ] = []

    public tableTitles: CommonTableInterface[ 'titles' ] = [
        {
            value: 'Status',
            isSortable: true
        },
        {
            value: 'Block',
            isSearchable: true,
            isSortable: true
        },
        {
            value: 'Farm',
            isSearchable: true,
            isSortable: true
        },
        {
            value: 'Variant',
            isSearchable: true,
            isSortable: true
        },
        {
            value: 'Ha',
            isSearchable: true,
            isSortable: true
        },
        {
            value: 'Created',
            isSortable: true
        },
        {
            value: 'Removed',
            isSortable: true
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

    getData() {
        return this._http.get< Array< FarmBlockInterface > >( '/assets/data/blocks.json' )
    }
}
