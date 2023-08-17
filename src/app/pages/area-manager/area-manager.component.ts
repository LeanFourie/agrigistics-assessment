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

    @ViewChild( 'configContainer', { static: true }) configContainerRef!: ElementRef

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

    // METHODS
    /**
     * Handle generic click events
     */
    public handleGenericClick = (): void => {
        console.log( 'Clicked' )
    }

    public handleFarmSelection = ( farm: { value: string } ): void => {
        this._farmBlocksService.selectedFarm$.next( farm.value )
    }

    public handleSearchValueChange = ( term: { value: string } ): void => {
        console.log( term )
    }

    public handleSearchEnter = ( term: { value: string } ): void => {
        if ( !this.searchTerms.includes( term.value ) ) {
            this._farmBlocksService.searchFilters$.next([
                ...this.searchTerms,
                term.value
            ])
        }
    }

    public handleToggleChange = ( toggleState: { state: BaseToggleStateType } ): void => {
        this._farmBlocksService.showOnlyRemovedBlocks$.next(
            toggleState.state === 'on' ? true : false
        )
    }

    public handleChipClick = ( value: { label: string }): void => {
        this._farmBlocksService.searchFilters$.next(
            this.searchTerms.filter( term => term !== value.label )
        )
    }

    public handleTableSearchClick = (): void => {
        const configContainerElement: HTMLElement = this.configContainerRef.nativeElement

        const searchContainerElement = configContainerElement.children[ 1 ] as HTMLElement

        const inputElement = searchContainerElement.getElementsByTagName( 'input' )[ 0 ]

        inputElement.focus()
    }

    public handleTableSortClick = ( sortLabel: string ): void => {
        const label: string = sortLabel.toLowerCase()

        this._farmBlocksService.sortBy = label

        const selectedTitle: CommonTableLineItemTitleInterface = this._farmBlocksService.tableTitles.find( title => title.value === sortLabel )!
        this._farmBlocksService.tableTitles.forEach( title => {
            if ( title.isSortable ) title.sortedBy = undefined
        })

        if ( label !== this._farmBlocksService.sortBy ) return

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

        this._farmBlocksService.getData().pipe(
            takeUntil( this._destroy$ )
        ).subscribe(data => {
            const uniqueFarms = new Set()
        
            this._farmBlocksService.availableFarms = data
                .map( entry => ({ label: entry.farmName }))
                .filter( farm => {
                    if ( !uniqueFarms.has( farm.label ) ) {
                        uniqueFarms.add( farm.label )

                        return true
                    }

                    return false
                })
        
            this.farms = this._farmBlocksService.availableFarms
        })

        const combinedStream$ = combineLatest([
            this._farmBlocksService.showOnlyRemovedBlocks$,
            this._farmBlocksService.searchFilters$,
            this._farmBlocksService.sortOrder$,
            this._farmBlocksService.getData()
        ])
        

        this._farmBlocksService.selectedFarm$.pipe(
            takeUntil( this._destroy$ ),
            switchMap( farm => {
                if ( !farm || farm === '' ) {
                    this.tableRows = this._farmBlocksService.emptyStateData

                    return []
                }
            
                this.selectedFarm = farm

                return combinedStream$
            }),
        ).subscribe(([ showOnlyRemovedBlocks, searchFilters, sortOrder, blocksData ]) => {
            let renderData: Array< FarmBlockInterface > = blocksData

            if ( showOnlyRemovedBlocks ) {
                renderData = renderData.filter( entry => entry.status === FarmBlockStatusEnum.Complete )
            }

            this.searchTerms = searchFilters.filter( term => term !== '' )

            if ( this.searchTerms.length > 0 ) {
                renderData = renderData.filter( entry => {
                    return Object.values( entry ).some( value => {
                        if ( value !== null ) {
                            return this.searchTerms.some( term => value.toString().toLowerCase().includes( term.toLowerCase() ) )
                        }

                        return false
                    })
                })
            }

            let tableData: CommonTableInterface[ 'rows' ] = formatTableData(
                renderData.filter( entry => entry.farmName === this.selectedFarm ),
                this.tableTitles
            )

            let blocksTotalSize: number = 0

            renderData.forEach( entry => {
                if ( entry.farmName === this.selectedFarm ) {
                    blocksTotalSize += entry.size
                }
            })
            
            if ( sortOrder !== 'unset' ) {
                const titleIndex = tableData[ 0 ].titles.findIndex( title => title.toLowerCase() === this._farmBlocksService.sortBy )

                tableData = [ ...tableData ].sort(( a, b ) => {
                    const objectA = a.cells[ titleIndex ]?.value || ''
                    const objectB = b.cells[ titleIndex ]?.value || ''
                    
                    const sortOrder = this._farmBlocksService.sortOrder$.value
                    return sortOrder === 'asc'
                            ? objectA.localeCompare( objectB )
                            : objectB.localeCompare( objectA )
                })
            }


            this.pagination.itemsCount = tableData.length
            this.pagination.visibleItems = tableData.length

            tableData.push({
                titles: this.tableTitles.map( title => title.value ),
                cells: [ ...Array( 7 ) ].map(( _, index ) => {
                    if ( index === 4 ) return { value: blocksTotalSize.toFixed( 2 ).toString() }

                    return { value: '' }
                })
            })

            this._farmBlocksService.blocksData = tableData

            this._farmBlocksService.workingData$.next( tableData )
        })

        this._farmBlocksService.workingData$.pipe(
            takeUntil( this._destroy$ )
        ).subscribe( data => {
            if ( this.selectedFarm ) this.tableRows = data
        })
    }

    public ngOnDestroy(): void {
        // Complete the destroy subject
        this._destroy$.next()
        this._destroy$.complete()
    }
}
