// Definition Imports
import type { BreakpointBoxModelInterface } from './interfaces'

// Types
type ThemeColorType = 'primary' | 'secondary'

type SemanticColorType = 'info' | 'success' | 'warning' | 'danger'

type NeutralColorType = 'black' | 'white' | 'grey'

type ColorType = ThemeColorType | SemanticColorType | NeutralColorType

type ShadeType = 'light' | 'dark'

type SizeType = 'sm' | 'md' | 'lg'

type SizeExtendedType = 'xs' | SizeType | 'xl'

type FormFieldVariantType = 'filled' | 'outlined'

type BoxModelType = number |
                    [ number, number?, number?, number? ]

type BreakpointBoxModelType = BoxModelType | BreakpointBoxModelInterface

// Exports
export type {
    ColorType,
    BoxModelType,
    BreakpointBoxModelType,
    FormFieldVariantType,
    NeutralColorType,
    SemanticColorType,
    ShadeType,
    SizeExtendedType,
    SizeType,
    ThemeColorType
}
