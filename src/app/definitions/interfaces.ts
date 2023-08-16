// Definition Imports
import type { BoxModelType } from './types'

// Interfaces
interface SizeInterface {
    height: number
    width: number
}

interface BreakpointSizesInterface {
    max: number
    min: number
}

interface BreakpointBoxModelInterface {
    desktop: BoxModelType
    tablet: BoxModelType
    mobile: BoxModelType
}

// Exports
export type {
    BreakpointBoxModelInterface,
    BreakpointSizesInterface,
    SizeInterface
}
