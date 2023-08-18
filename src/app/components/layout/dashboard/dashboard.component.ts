// CORE IMPORTS
import {
    Component,
    HostListener
} from '@angular/core'

@Component({
    selector: 'layout-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.scss'
    ]
})

export class DashboardComponent {
    // PUBLIC VARIABLES
    public navIsHidden = false
    public lastScrollTop = 0
  
    // HOST LISTENERS
    /**
     * Handle scroll events on the window
     */
    @HostListener( 'window:scroll', [ '$event' ] )
    onScroll() {
        // Get the cirrent scroll position
        const scrollTop = window.scrollY
    
        // Hide the navbar if the user scrolls down
        this.navIsHidden = scrollTop > this.lastScrollTop
    
        // Update the value of the last scroll top
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }
}
