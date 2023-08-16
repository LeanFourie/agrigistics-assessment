// Definition Imports
import { FarmBlockStatusEnum } from './enums'
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

interface FarmBlockInterface {
    name: string
    farmName: string
    variant: string
    deletedAt: string
    status: FarmBlockStatusEnum,
    createdAt: string
    size: number
}

// Exports
export type {
    BreakpointBoxModelInterface,
    BreakpointSizesInterface,
    FarmBlockInterface,
    SizeInterface
}
