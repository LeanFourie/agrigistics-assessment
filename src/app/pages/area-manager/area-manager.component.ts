// Core Imports
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core'
import { Subject } from 'rxjs'
import { switchMap, takeUntil } from 'rxjs/operators'
import { FarmBlocksService } from './../../services/farm-blocks.service'
import { WindowSizeService } from './../../services/window-size.service'
import { formatTableData } from './../../utils/utils'

// Definition Imports
import type { BaseActionsListItemInterface } from './../../components/base/actions-list-item/actions-list-item.definitions'
import type { BaseToggleStateType } from './../../components/base/toggle/toggle.definitions'
import type { CommonTableInterface } from './../../components/common/table/table.defnitions'
import { FarmBlockStatusEnum } from './../../definitions/enums'
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

    public tableTitles: CommonTableInterface[ 'titles' ] = this._farmBlocksService.tableTitles

    public tableRows: CommonTableInterface[ 'rows' ] = []

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

    public hanldeTableSearchClick = (): void => {
        const configContainerElement: HTMLElement = this.configContainerRef.nativeElement

        const searchContainerElement = configContainerElement.children[ 1 ] as HTMLElement

        const inputElement = searchContainerElement.getElementsByTagName( 'input' )[ 0 ]

        inputElement.focus()
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
        

        this._farmBlocksService.selectedFarm$.pipe(
            takeUntil( this._destroy$ ),
            switchMap( farm => {
                if ( !farm || farm === '' ) {
                    this.tableRows = this._farmBlocksService.emptyStateData

                    return []
                }
            
                this.selectedFarm = farm

                return this._farmBlocksService.getData()
            }),
        ).subscribe( data => {
            let tableData: CommonTableInterface[ 'rows' ] = formatTableData(
                data.filter( entry => entry.farmName === this.selectedFarm ),
                this.tableTitles
            )

            let blocksTotalSize: number = 0

            data.forEach( entry => { blocksTotalSize += entry.size })

            tableData.push({
                titles: this.tableTitles.map( title => title.value ),
                cells: [
                    { value: '' },
                    { value: '' },
                    { value: '' },
                    { value: '' },
                    { value: blocksTotalSize.toFixed( 2 ).toString() },
                    { value: '' },
                    { value: '' }
                ]
            })

            this._farmBlocksService.blocksData = tableData

            if ( this._farmBlocksService.showOnlyRemovedBlocks$.value ) {
                tableData = tableData.filter( entry => entry.status === FarmBlockStatusEnum.Complete )
            }

            if ( this.searchTerms.length > 0 ) {
                tableData = tableData.filter( obj =>
                    obj.cells.some( cell => {
                        if ( !cell.value ) return false
                
                        return this.searchTerms.some( searchTerm =>
                            cell.value.toLowerCase().includes( searchTerm.toLowerCase() )
                        )
                    })
                )
            }

            this._farmBlocksService.workingData$.next( tableData )
        })

        this._farmBlocksService.showOnlyRemovedBlocks$.pipe(
            takeUntil( this._destroy$ )
        ).subscribe( value => {
            if ( !value ) {
                if ( this.searchTerms.length <= 0 ) {
                    this._farmBlocksService.workingData$.next( this._farmBlocksService.blocksData )
    
                    return
                }

                this._farmBlocksService.workingData$.next(
                    this._farmBlocksService.blocksData.filter( obj =>
                        obj.cells.some( cell => {
                            if ( !cell.value ) return false
                    
                            return this.searchTerms.some( searchTerm =>
                                cell.value.toLowerCase().includes( searchTerm.toLowerCase() )
                            )
                        })
                    )
                )

                return
            }

            this._farmBlocksService.workingData$.next(
                this.tableRows.filter( entry => entry.status === FarmBlockStatusEnum.Complete )
            )
        })

        this._farmBlocksService.workingData$.pipe(
            takeUntil( this._destroy$ )
        ).subscribe( data => {
            if ( this.selectedFarm ) this.tableRows = data
        })

        this._farmBlocksService.searchFilters$.pipe(
            takeUntil( this._destroy$ )
        ).subscribe( terms => {
            this.searchTerms = terms.filter( term => term !== '' )

            if ( this.searchTerms.length <= 0 ) {
                if ( !this._farmBlocksService.showOnlyRemovedBlocks$.value ) {
                    this._farmBlocksService.workingData$.next( this._farmBlocksService.blocksData )
    
                    return
                }

                this._farmBlocksService.workingData$.next(
                    this._farmBlocksService.blocksData.filter( entry => entry.status === FarmBlockStatusEnum.Complete )
                )

                return
            }

            this._farmBlocksService.workingData$.next(
                this._farmBlocksService.blocksData.filter( obj =>
                    obj.cells.some( cell => {
                        if ( !cell.value ) return false
                
                        return this.searchTerms.some( searchTerm =>
                            cell.value.toLowerCase().includes( searchTerm.toLowerCase() )
                        )
                    })
                )
            )
        })
    }

    public ngOnDestroy(): void {
        // Complete the destroy subject
        this._destroy$.next()
        this._destroy$.complete()
    }
}
