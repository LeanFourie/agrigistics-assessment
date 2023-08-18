// Core Imports
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'common-app-loader',
    templateUrl: './app-loader.component.html',
    styleUrls: [
        './app-loader.component.scss'
    ]
})

export class AppLoaderComponent implements OnInit {
    // PUBLIC VARIABLES
    public numbersLarge: Array< string > = [ '1', ' ', ' ', ' ' ]
    public numbersMedium: Array< string > = []
    public numbersSmall: Array< string > = []
    public numbersPositions: Array< number > = []
    public countTranslateY: string = `translateY( calc( -0vh + 0% ) )`
    public transitionEnded: boolean = false
    public currentLoadPercentage: number = 0
    public logoUri: string = 'assets/images/image-agrigistics-logo-white.svg'

    // METHODS
    /**
     * Generates random numbers within a range
     * 
     * @param min - The minimum number in the range
     * @param max - The maximum number in the range
     * 
     * @returns The randomised number
     */
    private getRandomNumberInRange(
        min: number,
        max: number
    ): number {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min
    }

    /**
     * Create a timeout
     * 
     * @param ms - The amount of miliseconds the timeout should last
     * 
     * @returns A timeout promise
     */
    private sleep = ( ms: number ): Promise< unknown > => {
        // Return the timeout promise
        return new Promise( resolve => setTimeout( resolve, ms ) )
    }

    /**
     * Update the animation values
     * 
     * @param positionIndex - The index position of the `numbersPositions` value to use
     * @param percentageValue - The current animation progress percentage
     */
    private updateValues = async (
        positionIndex: number,
        percentageValue: number
    ): Promise< void > => {
        // Increment the `currentLoadPercentage` variable value by 100
        this.currentLoadPercentage += 100

        // Update the count translateY position
        this.countTranslateY = `translateY( calc( -${ this.numbersPositions[ positionIndex ] }vh + ${ percentageValue }% ) )`

        // Wait 1 second
        await this.sleep( 1000 )
    }

    /**
     * Sets the numbers used in the loader count
     */
    private setNumbers = async (): Promise< void > => {
        // Generate random numbers for the medium numbers range
        this.numbersMedium = [
            '0',
            this.getRandomNumberInRange( 5, 7 ).toString(),
            this.getRandomNumberInRange( 2, 3 ).toString(),
            ' '
        ]

        // Generate random numbers for the small numbers range
        this.numbersSmall = [
            '0',
            this.getRandomNumberInRange( 1, 9 ).toString(),
            this.getRandomNumberInRange( 1, 9 ).toString(),
            '0'
        ]

        // Create the number positions range used to translate the number HTML element
        this.numbersPositions = this.numbersSmall.map(( num, index ) => {
            // Generate the medium number value
            let mediumNum: number = this.numbersMedium[ index ] === '-'
                                        ? 0
                                        : ( parseInt( this.numbersMedium[ index ] ) * 10 )
            
            // Set the first number to 100 as to complete the tranformation
            if (index === 0) mediumNum = 100

            // Return the number in the range
            return parseInt( num ) + mediumNum
        }).reverse()

        // Wait for a second before starting the animations
        await this.sleep( 1000 )

        // Run the first part of the animations
        await this.updateValues( 1, 33 )

        // Run the second part of the animations
        await this.updateValues( 2, 66 )

        // Run the third part of the animations
        await this.updateValues( 3, 100 )

        // End the animations
        this.transitionEnded = true
    }

    // LIFECYCLE METHODS
    public ngOnInit(): void {
        // Initiate the setNumbers method
        this.setNumbers()
    }
}
