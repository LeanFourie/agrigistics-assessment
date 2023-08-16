// Core Imports
import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { WindowSizeService } from './../../../services/window-size.service'

// Definition Imports
import type { CommonNavItemInterface } from './../../common/nav-item/nav-item.definitions'
import type { SizeInterface } from './../../../definitions/interfaces'

@Component({
    selector: 'layout-nav',
    templateUrl: './nav.component.html',
    styleUrls: [
        './nav.component.scss'
    ]
})

export class NavComponent implements OnInit, OnDestroy {
    // PRIVATE SUBJECTS
    private _destroy$ = new Subject< void >()

    // CONSTRUCTOR
    constructor( private _windowSizeService: WindowSizeService ) {}

    // PUBLIC VARIABLES
    public navItems: Array<
        Omit<
            CommonNavItemInterface,
            'onClick'
        >
    > = [
        {
            icon: 'notifications',
            label: 'Notifications',
            filledIcon: true
        },
        {
            icon: 'system_update_alt',
            label: 'System Updates'
        },
        {
            icon: 'person',
            label: 'Profile',
            filledIcon: true
        },
        {
            icon: 'help',
            label: 'Help'
        }
    ]

    public logoUri: string = 'assets/images/image-agrigistics-logo.svg'

    public windowSize: SizeInterface = {
        width: 0,
        height: 0
    }

    public tabletBrakpoint: number = this._windowSizeService.tabletSize.max

    // METHODS
    /**
     * Handle click events on the nav items
     */
    public handleNavItemClick = (): void => {
        // Log the click event
        console.log( 'Clicked' )
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
