// Core Imports
import {
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core'
import { generateSnakeCase } from './../../../utils/utils'

// Definition Imports
import type { BaseTextInterface } from './text.definitions'

@Component({
    selector: 'base-text',
    templateUrl: './text.component.html',
    styleUrls: [
        './text.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class TextComponent {
    // REQUIRED INPUTS
    /**
     * Determines the variant of text to render
     * 
     * @default `paragraph md`
     */
    @Input() public variant: BaseTextInterface[ 'variant' ] = 'paragraph md'

    // OPTIONAL INPUTS
    /**
     * Determines whether the text element should be rendered as a span tag
     */
    @Input() public fontStyle?: BaseTextInterface[ 'fontStyle' ] = 'regular'

    /**
     * Determines whether the text element should be rendered as a span tag
     */
    @Input() public fontWeight?: BaseTextInterface[ 'fontWeight' ] = 'regular'

    /**
     * Determines whether the text element should be rendered as a span tag
     */
    @Input() public renderAsSpan?: BaseTextInterface[ 'renderAsSpan' ] = false

    // PUBLIC VARIABLES
    public className: string = 'text'

    // METHODS
    /**
     * Generates the required class names for the component
     * 
     * @returns A string with relevant class names
     */
    public returnClassNames = (): string => {
        return `
            ${ this.className }
            ${ this.className }--style-${ generateSnakeCase( this.fontStyle! ) }
            ${ this.className }--variant-${ generateSnakeCase( this.variant ) }
            ${ this.className }--weight-${ generateSnakeCase( this.fontWeight! ) }
        `
    }
}
