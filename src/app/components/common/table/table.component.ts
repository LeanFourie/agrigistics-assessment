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

// Deinfition Imports
import type { CommonTableInterface } from './table.defnitions'
import type { SizeInterface } from './../../../definitions/interfaces'

@Component({
    selector: 'common-table',
    templateUrl: './table.component.html',
    styleUrls: [
        './table.component.scss'
    ]
})

export class TableComponent implements OnInit, OnDestroy {
    // PRIVATE SUBJECTS
    private _destroy$ = new Subject< void >()

    // REQUIRED INPUTS
    /**
     * Determines the rows to be rendered inside the table
     * 
     * @default []
     */
    @Input() public rows: CommonTableInterface[ 'rows' ] = []

    /**
     * Determines the th items of the table
     * 
     * @default []
     */
    @Input() public titles: CommonTableInterface[ 'titles' ] = []

    // CONSTRUCTOR
    constructor( private windowSizeService: WindowSizeService ) {}

    // PUBLIC VARIABLES
    public windowSize: SizeInterface = {
        width: 0,
        height: 0
    }

    public tabletBrakpoint: number = this.windowSizeService.tabletSize.max

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
