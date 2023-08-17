// IMPORTS
// Definition Imports
import { FarmBlockStatusEnum } from './../definitions/enums'
import type { FarmBlockInterface } from './../definitions/interfaces'
import type { BoxModelType } from './../definitions/types'
import type { CommonPaginationInterface } from './../components/common/pagination/pagination.definitions'
import type { CommonTableInterface } from './../components/common/table/table.defnitions'

// VARIABLES
const defaultPaginationConfig: CommonPaginationInterface = {
    currentPage: 1,
    itemsCount: 0,
    itemsPerPage: 50,
    pagesCount: 1,
    visibleItems: 0
}

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

const formatDates = ( date: Date ): string => {
    const day: string = String( date.getDate() ).padStart( 2, '0' )
    const month: string = String( date.getMonth() + 1 ).padStart( 2, '0' )
    const year: number = date.getFullYear()
    
    return `${ day }/${ month }/${ year }`
}

const formatTableData = (
    initialData: Array< FarmBlockInterface >,
    titles: CommonTableInterface[ 'titles' ]
): CommonTableInterface[ 'rows' ] => {
    return initialData.map( entry => ({
        titles: titles.map( title => title.value ),
        status: entry.status,
        cells: [
            {
                value: entry.status === FarmBlockStatusEnum.Production ? 'filter_vintage' : 'location_on',
                type: 'icon'
            },
            {
                value: entry.name
            },
            {
                value: entry.farmName
            },
            {
                value: entry.variant
            },
            {
                value: entry.size.toFixed( 2 ).toString()
            },
            {
                value: formatDates( new Date( entry.createdAt ) )
            },
            {
                value: entry.deletedAt ? formatDates( new Date( entry.deletedAt ) ) : ''
            }
        ]
    }))
}

// EXPORTS
export {
    // VARIABLES
    defaultPaginationConfig,

    // METHODS
    calculateRemValue,
    formatDates,
    formatTableData,
    generateSnakeCase,
    returnPaddingValue
}
