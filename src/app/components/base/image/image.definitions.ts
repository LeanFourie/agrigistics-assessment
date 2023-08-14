// Types
type BaseImageFitType = 'contain' | 'cover'

// Interfaces
interface BaseImageInterface {
    // Requires
    alt: string
    src: string

    // Optional
    fit?: BaseImageFitType
}

// Exports
export type { BaseImageInterface }
