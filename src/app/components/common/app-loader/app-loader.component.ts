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

    private setNumbers = (): void => {
        this.numbersMedium = [
            '0',
            ( Math.floor( Math.random() * 2 + 5 ) ).toString(),
            ( Math.floor( Math.random() + 2 ) ).toString(),
            ' '
        ]

        this.numbersSmall = [
            '0',
            ( Math.floor( Math.random() * 9 ) + 1 ).toString(),
            ( Math.floor( Math.random() * 9 ) + 1 ).toString(),
            '0'
        ]

        this.numbersPositions = this.numbersSmall.map(( num, index ) => {
            let mediumNum: number = this.numbersMedium[ index ] === '-' ? 0 : ( parseInt( this.numbersMedium[ index ] ) * 10  )

            if ( index === 0 ) mediumNum = 100

            return parseInt( num ) + mediumNum
        }).reverse()

        setTimeout(() => {
            this.currentLoadPercentage = this.currentLoadPercentage + 100
            this.countTranslateY = `translateY( calc( -${ this.numbersPositions[ 1 ] }vh + 33% ) )`

            setTimeout(() => {
                this.currentLoadPercentage = this.currentLoadPercentage + 100
                this.countTranslateY = `translateY( calc( -${ this.numbersPositions[ 2 ] }vh + 66% ) )`

                setTimeout(() => {
                    this.currentLoadPercentage = this.currentLoadPercentage + 100
                    this.countTranslateY = `translateY( calc( -${ this.numbersPositions[ 3 ] }vh + 100% ) )`

                    setTimeout(() => {
                        this.transitionEnded = true
                    }, 1000 )
                }, 1000 )
            }, 1000 )
        }, 1000 )
    }

    public ngOnInit(): void {
        this.setNumbers()
    }
}
