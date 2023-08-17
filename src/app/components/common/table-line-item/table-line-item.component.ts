// Core Imports
import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { WindowSizeService } from './../../../services/window-size.service'

// Definition Imports
import type {
    CommonTableLineItemCellInterface,
    CommonTableLineItemInterface,
    CommonTableLineItemTitleInterface
} from './table-line-item.definitions'
import { FarmBlockStatusEnum } from './../../../definitions/enums'
import type { SizeInterface } from './../../../definitions/interfaces'

@Component({
    selector: 'common-table-line-item',
    templateUrl: './table-line-item.component.html',
    styleUrls: [
        './table-line-item.component.scss'
    ]
})

export class TableLineItemComponent implements OnInit, OnDestroy {
    // PRIVATE SUBJECTS
    private _destroy$ = new Subject< void >()

    // REQUIRED INPUTS
    /**
     * Determines the cells to be rendered inside the row
     * 
     * @default []
     */
    @Input() public cells: CommonTableLineItemInterface[ 'cells' ] = []

    /**
     * Determines the cell titles to render on mobile devices
     * 
     * @default []
     */
    @Input() public titles: CommonTableLineItemInterface[ 'titles' ] = []

    /**
     * Styles the cell item text according to the table title styles
     * 
     * @default false
     */
    @Input() public isTitlesRow?: CommonTableLineItemInterface[ 'isTitlesRow' ] = false

    /**
     * Determines the status of the row item
     * 
     * @default undefined
     */
    @Input() public status?: CommonTableLineItemInterface[ 'status' ]

    // REQUIRED OUTPUTS
    @Output() public onSearchClick: EventEmitter< void > = new EventEmitter()
    @Output() public onSortClick: EventEmitter< string > = new EventEmitter()

    // CONSTRUCTOR
    constructor( private _windowSizeService: WindowSizeService ) {}

    // PUBLIC VARIABLES
    public className: string = 'row'

    public windowSize: SizeInterface = {
        width: 0,
        height: 0
    }

    public tabletBrakpoint: number = this._windowSizeService.tabletSize.max

    public visibleTooltipCell: number | undefined

    // METHODS
    /**
     * Generates the required class names for the component
     * 
     * @returns A string with relevant class names
     */
    public returnClassNames = (): string => {
        return `
            ${ this.className }
            ${ this.className }--status-${ this.status?.toLowerCase() }
            ${ this.isTitlesRow ? `${ this.className }--is-titles-row` : '' }
        `
    }

    public cellIsSortable( cell: CommonTableLineItemCellInterface | CommonTableLineItemTitleInterface ): boolean {
        return ( 'isSortable' in cell ) && cell.isSortable!
    }

    public cellIsSearchable( cell: CommonTableLineItemCellInterface | CommonTableLineItemTitleInterface ): boolean {
        return ( 'isSearchable' in cell ) && cell.isSearchable!
    }

    public getTooltipLabel = (): string => {
        if ( !this.status ) return 'unknown'

        let rowStatus: string

        switch ( true ) {
            case this.status === FarmBlockStatusEnum.Area:
                rowStatus = 'Active'
                break
            case this.status === FarmBlockStatusEnum.Complete:
                rowStatus = 'Removed'
                break
            default:
                rowStatus = 'In Production'
                break
        }

        return rowStatus
    }

    /**
     * Toggles the visibility of the tooltip
     */
    public toggleTooltipVisibility = ( index: number | undefined ): void => {
        // Check if the current window size is within the range of tablet and mobile THEN...
        // end the function
        if ( this.windowSize.width < this.tabletBrakpoint ) return

        // Toggle the tooltip visibility variable
        this.visibleTooltipCell = index
    }

    public handleSearchClick = (): void => {
        this.onSearchClick.emit()
    }

    public handleSortClick = ( sortLabel: string): void => {
        this.onSortClick.emit( sortLabel )
    }

    public checkIfSortIsActive = ( cell: CommonTableLineItemTitleInterface ): string => {
        return cell.sortedBy!
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
    }

    public ngOnDestroy(): void {
        // Complete the destroy subject
        this._destroy$.next()
        this._destroy$.complete()
    }
}
