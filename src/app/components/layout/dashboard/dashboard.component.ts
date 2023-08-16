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
    @HostListener( 'window:scroll', [ '$event' ] )
    onScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
    
        this.navIsHidden = scrollTop > this.lastScrollTop
    
        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }
}
