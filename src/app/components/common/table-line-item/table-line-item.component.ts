// Core Imports
import {
    Component,
    Input,
    OnDestroy,
    OnInit
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
     * @default `in-production`
     */
    @Input() public status?: CommonTableLineItemInterface[ 'status' ] = 'in-production'

    // CONSTRUCTOR
    constructor( private windowSizeService: WindowSizeService ) {}

    // PUBLIC VARIABLES
    public className: string = 'row'

    public windowSize: SizeInterface = {
        width: 0,
        height: 0
    }

    public tabletBrakpoint: number = this.windowSizeService.tabletSize.max

    // METHODS
    /**
     * Generates the required class names for the component
     * 
     * @returns A string with relevant class names
     */
    public returnClassNames = (): string => {
        return `
            ${ this.className }
            ${ this.className }--status-${ this.status }
            ${ this.isTitlesRow ? `${ this.className }--is-titles-row` : '' }
        `
    }

    public cellIsSortable( cell: CommonTableLineItemCellInterface | CommonTableLineItemTitleInterface ): boolean {
        return ('isSortable' in cell) && cell.isSortable!
    }

    public cellIsSearchable( cell: CommonTableLineItemCellInterface | CommonTableLineItemTitleInterface ): boolean {
        return ( 'isSearchable' in cell ) && cell.isSearchable!
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
