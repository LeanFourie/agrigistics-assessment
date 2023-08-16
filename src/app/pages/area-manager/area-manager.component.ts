// Core Imports
import {
    Component, OnDestroy, OnInit
} from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { WindowSizeService } from './../../services/window-size.service'

// Definition Imports
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

    // METHODS
    /**
     * Handle generic click events
     */
    public handleGenericClick = (): void => {
        console.log( 'Clicked' )
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
