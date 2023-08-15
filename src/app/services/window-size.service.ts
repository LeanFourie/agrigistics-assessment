// Core Imports
import {
    Injectable,
    OnDestroy
} from '@angular/core'
import {
    BehaviorSubject,
    fromEvent,
    Subject
} from 'rxjs'
import { takeUntil } from 'rxjs/operators'

// Definition Imports
import type {
    BreakpointSizesInterface,
    SizeInterface
} from '../definitions/interfaces'

@Injectable({
  providedIn: 'root'
})

export class WindowSizeService implements OnDestroy {
    // PRIVATE SUBJECTS
    private _destroy$ = new Subject< void >()

    // PUBLIC SUBJECTS
    /**
     * Saves the current window size values
     */
    public windowSizeSubject: BehaviorSubject< SizeInterface > = new BehaviorSubject({
        width: 0,
        height: 0
    })

    // PUBLIC VARIABLES
    public mobileSize: BreakpointSizesInterface = {
        max: 750,
        min: 0
    }
    public tabletSize: BreakpointSizesInterface = {
        max: 1200,
        min: this.mobileSize.max + 1
    }
    public desktopSize: BreakpointSizesInterface = {
        max: 5000,
        min: this.tabletSize.max + 1
    }

    // CONSTRUCTOR
    constructor() {
        // Update the window size Subject with the current window size values
        this.windowSizeSubject.next({
            width: window.innerWidth,
            height: window.innerHeight
        })

        // Subscribe to the window resize event
        fromEvent( window, 'resize' ).pipe(
            takeUntil( this._destroy$ )
        ).subscribe(() => 
            // Update the window size Subject with the current window size values
            this.windowSizeSubject.next({
                width: window.innerWidth,
                height: window.innerHeight
            })
        )
    }

    // LIFECYLE METHODS
    public ngOnDestroy() {
        // Complete the destroy subject
        this._destroy$.next()
        this._destroy$.complete()
    }
}