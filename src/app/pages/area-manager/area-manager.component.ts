// Core Imports
import {
    Component, OnDestroy, OnInit
} from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { WindowSizeService } from './../../services/window-size.service'

// Definition Imports
import type { BaseActionsListItemInterface } from './../../components/base/actions-list-item/actions-list-item.definitions'
import type { BaseToggleStateType } from './../../components/base/toggle/toggle.definitions'
import type { CommonTableInterface } from './../../components/common/table/table.defnitions'
import type { SizeInterface } from './../../definitions/interfaces'

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

    // CONSTRUCTOR
    constructor( private windowSizeService: WindowSizeService ) {}

    // PUBLIC VARIABLES
    public windowSize: SizeInterface = {
        width: 0,
        height: 0
    }

    public tabletBrakpoint: number = this.windowSizeService.tabletSize.max

    public farms: Array<
        Omit<
            BaseActionsListItemInterface,
            'onClick'
        >
    > = [
        { label: 'Farm 1' },
        { label: 'Farm 2' },
        { label: 'Farm 3' },
        { label: 'Farm 4' },
        { label: 'Farm 1' },
        { label: 'Farm 2' },
        { label: 'Farm 3' },
        { label: 'Farm 4' }
    ]

    public selectedFarm: string = ''

    public searchTerm: string = ''

    public searchTerms: Array< string > = []

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

    public tableRows: CommonTableInterface[ 'rows' ] = [
        {
            titles: this.tableTitles.map( title => title.value ),
            cells: [
                {
                    value: 'location_on',
                    type: 'icon'
                },
                {
                    value: 'A2'
                },
                {
                    value: 'Brooklyn'
                },
                {
                    value: 'Durance'
                },
                {
                    value: '10'
                },
                {
                    value: '20/04/2021'
                },
                {
                    value: '20/04/2021'
                }
            ]
        },
        {
            titles: this.tableTitles.map( title => title.value ),
            cells: [
                {
                    value: 'location_on',
                    type: 'icon'
                },
                {
                    value: 'A2'
                },
                {
                    value: 'Brooklyn'
                },
                {
                    value: 'Durance'
                },
                {
                    value: '10'
                },
                {
                    value: '20/04/2021'
                },
                {
                    value: '20/04/2021'
                }
            ]
        },
        {
            titles: this.tableTitles.map( title => title.value ),
            cells: [
                {
                    value: 'location_on',
                    type: 'icon'
                },
                {
                    value: 'A2'
                },
                {
                    value: 'Brooklyn'
                },
                {
                    value: 'Durance'
                },
                {
                    value: '10'
                },
                {
                    value: '20/04/2021'
                },
                {
                    value: '20/04/2021'
                }
            ]
        },
        {
            titles: this.tableTitles.map( title => title.value ),
            cells: [
                {
                    value: '',
                    hideOnMobile: true
                },
                {
                    value: '',
                    hideOnMobile: true
                },
                {
                    value: '',
                    hideOnMobile: true
                },
                {
                    value: '',
                    hideOnMobile: true
                },
                {
                    value: '10'
                },
                {
                    value: '',
                    hideOnMobile: true
                },
                {
                    value: '',
                    hideOnMobile: true
                }
            ]
        }
    ]

    // METHODS
    /**
     * Handle generic click events
     */
    public handleGenericClick = (): void => {
        console.log( 'Clicked' )
    }

    public handleFarmSelection = ( farm: { value: string } ): void => {
        console.log( farm )
    }

    public handleSearchValueChange = ( term: { value: string } ): void => {
        console.log( term )
    }

    public handleToggleChange = ( toggleState: { state: BaseToggleStateType } ): void => {
        console.log( toggleState )
    }

    // LIFECYCLE METHODS
    public ngOnInit(): void {
        // Subscribe to the window size service observable
        this.windowSizeService.windowSizeSubject.pipe(
            takeUntil( this._destroy$ )
        ).subscribe( size => {
            // Update the window size value with the current window size
            this.windowSize = size
        })
    }

    public ngOnDestroy(): void {
        // Complete the destroy subject
        this._destroy$.next()
        this._destroy$.complete()
    }
}
