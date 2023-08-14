// Types
type BaseIconStyleType = 'rounded' | 'sharp'

// Interfaces
interface BaseIconInterface {
    // Required
    name: string

    // Optional
    filled?: boolean
    style?: BaseIconStyleType
}

// Exports
export type { BaseIconInterface }
