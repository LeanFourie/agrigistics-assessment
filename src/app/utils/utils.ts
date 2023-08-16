// IMPORTS
// Definition Imports
import type { BoxModelType } from './../definitions/types'

// METHODS
/**
 * Transforms sentence case strings to snake-case strings
 * 
 * @param value - The sentence canse string to be converted
 * 
 * @returns A snake case string value
 */
const generateSnakeCase = ( value: string ): string => {
    return value.split( ' ' ).join( '-' )
}

/**
 * Transforms PX size values to REM size values
 * 
 * @param pxValue - The PX size value to be converted
 * 
 * @returns A number value
 */
const calculateRemValue = ( pxValue: number ): number => {
    return pxValue / 16
}

/**
 * Converts number values to string padding values
 * 
 * @param paddingValue - The padding value to be converted
 * 
 * @returns A string value
 */
const returnPaddingValue = ( paddingValue: BoxModelType ): string => {
    // Check if the paddingValue is a number THEN...
    // return the number as a REM size value
    if ( typeof paddingValue === 'number' ) return `${ calculateRemValue( paddingValue ) }rem`

    // Convert each number in the array to a REM size string value AND...
    // return the array as a joined string
    return paddingValue.map( pad => `${ calculateRemValue( pad! ) }rem` ).join( ' ' )
}

// EXPORTS
export {
    calculateRemValue,
    generateSnakeCase,
    returnPaddingValue
}
