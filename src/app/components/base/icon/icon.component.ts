// Core Imports
import {
    Component,
    Input,
    OnInit
} from '@angular/core'

// Definition Imports
import type { BaseIconInterface } from './icon.definitions'

@Component({
    selector: 'base-icon',
    templateUrl: './icon.component.html',
    styleUrls: [
        './icon.component.scss'
    ]
})

export class IconComponent implements OnInit {
    // REQUIRED INPUTS
    /**
     * Determines the icon to render
     * 
     * @default `circle`
     */
    @Input() public name: BaseIconInterface[ 'name' ] = 'circle'

    // OPTIONAL INPUTS
    /**
     * Determines whether the icon is filled or not
     * 
     * @default false
     */
    @Input() public filled?: BaseIconInterface[ 'filled' ] = false

    /**
     * Determines whether the icon has sharp or rounded corners
     * 
     * @default `rounded`
     */
    @Input() public style?: BaseIconInterface[ 'style' ] = 'sharp'

    // PUBLIC VARIABLES
    public materialSymbolRenderClass: string = '';

    // LIFECYLE METHODS
    public ngOnInit(): void {
        // Update the material symbol font to use
        this.materialSymbolRenderClass = `material-symbols-${ this.style }`
    }
}
