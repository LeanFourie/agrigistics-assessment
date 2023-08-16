// Definition Imports
import {
    BreakpointBoxModelType,
    ShadeType,
    SizeExtendedType
} from './../../../definitions/types'

// Interfaces
interface BaseCardInterface {
    // Optional
    borderRadius?: SizeExtendedType
    padding?: BreakpointBoxModelType
    shade?: ShadeType
}

// Exports
export type { BaseCardInterface }
