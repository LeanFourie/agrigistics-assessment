// METHODS
const generateSnakeCase = ( value: string ): string => {
    return value.split( ' ' ).join( '-' )
}

// EXPORTS
export {
    generateSnakeCase
}
