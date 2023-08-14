// Core Imports
import {
    Component,
    Input
} from '@angular/core'

// Definition Imports
import type { BaseImageInterface } from './image.definitions'

@Component({
    selector: 'base-image',
    templateUrl: './image.component.html',
    styleUrls: [
        './image.component.scss'
    ]
})

export class ImageComponent {
    // REQUIRED INPUTS
    /**
     * The alternative text to render with the image
     * 
     * @default ``
     */
    @Input() public alt: BaseImageInterface[ 'alt' ] = ''

    /**
     * The image source URI
     * 
     * @default ``
     */
    @Input() public src: BaseImageInterface[ 'src' ] = ''

    // OPTIONAL INPUTS
    /**
     * Determines whether the image will fill the container or fit inside
     * 
     * @default `fit`
     */
    @Input() public fit?: BaseImageInterface[ 'fit' ] = 'contain'
}
