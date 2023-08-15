// Core Imports
import {
    AfterViewInit,
    Component,
    Input,
    ViewChild,
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
export class TextComponent implements AfterViewInit {
    // VIEW CHILD
    @ViewChild(
        'textContainer',
        { static: true }
    ) public textContainer: any

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
    public defaultTag: string = 'p'
    public innerText: string = ''

    // METHODS
    /**
     * Determines the HTML tag to render for the text component
     * 
     * @returns A string value for the HTML element tag
     */
    private generateHtmlTag = (): string => {
        // Create a variable to store the tag value
        let htmlTag: string = this.defaultTag

        // Update the variable value base on specific conditions
        switch ( true ) {
            case this.renderAsSpan:
                htmlTag = 'span'
                break
            case this.variant === 'heading lg':
                htmlTag = 'h1'
                break
            case this.variant === 'heading md':
                htmlTag = 'h2'
                break
            case this.variant === 'heading sm' ||
                 this.variant === 'heading xs':
                htmlTag = 'h3'
                break
            case this.variant === 'sub-heading lg':
                htmlTag = 'h4'
                break
            case this.variant === 'sub-heading md':
                htmlTag = 'h5'
                break
            case this.variant === 'sub-heading sm' ||
                 this.variant === 'sub-heading xs':
                htmlTag = 'h6'
                break
            case this.variant === 'label lg' ||
                 this.variant === 'label md' ||
                 this.variant === 'label sm' ||
                 this.variant === 'label xs':
                htmlTag = 'label'
                break
            default:
                htmlTag = this.defaultTag
                break
        }

        // Return the tag element as a string
        return htmlTag
    }

    /**
     * Generates the HTML content for the text element
     */
    private generateInnerHtml = (): void => {
        // Get the HTML Tag to render
        const tag = this.generateHtmlTag()

        // Get the text container native element
        const element: HTMLElement = this.textContainer.nativeElement

        // Get the content of the text element
        this.innerText = element.innerText

        // Create the text element to render
        element.innerHTML = `
            <${ tag }
                class="
                    text__element
                    text__element--style-${ generateSnakeCase( this.fontStyle! ) }
                    text__element--variant-${ generateSnakeCase( this.variant ) }
                    text__element--weight-${ generateSnakeCase( this.fontWeight! ) }
                "
            >
                ${ this.innerText }
            </${ tag }>
        `
    }

    // LIFECYLE METHODS
    public ngAfterViewInit(): void {
        this.generateInnerHtml()
    }
}
