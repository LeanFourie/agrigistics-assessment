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
