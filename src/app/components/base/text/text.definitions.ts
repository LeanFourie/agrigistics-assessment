// Imports
import type { SizeExtendedType } from './../../../definitions/types'

// Types
type BaseTextFontStyleType = 'regular' | 'italic'

type BaseTextFontWeightType =   'thin' | 'extra light' | 'light' | 'regular' |
                                'medium' | 'semi bold' | 'bold' | 'extra bold' | 'black'

type BaseTextSizesType = Exclude< SizeExtendedType, 'xl' >

type BaseTextVariantOptionsType = 'heading' | 'sub-heading' | 'paragraph' | 'label'

type BaseTextVariantType = `${ BaseTextVariantOptionsType } ${ BaseTextSizesType }`

// Interfaces
interface BaseTextInterface {
    // Required
    variant: BaseTextVariantType

    // Optional
    fontStyle?: BaseTextFontStyleType
    fontWeight?: BaseTextFontWeightType
    renderAsSpan?: boolean
}

// Exports
export type { BaseTextInterface }
