// Types
type ThemeColorType = 'primary' | 'secondary'

type SemanticColorType = 'info' | 'success' | 'warning' | 'danger'

type NeutralColorType = 'black' | 'white' | 'grey'

type ColorType = ThemeColorType | SemanticColorType | NeutralColorType

type ShadeType = 'light' | 'dark'

type SizeType = 'sm' | 'md' | 'lg'

type SizeExtendedType = 'xs' | SizeType | 'xl'

// Exports
export type {
    ColorType,
    NeutralColorType,
    SemanticColorType,
    ShadeType,
    SizeExtendedType,
    SizeType,
    ThemeColorType
}
