export interface ResolverMap {
    [key: string]: {
        [key: string]: (
            parent: any,
            args: any,
            context: { user: number },
            info: any
        ) => any
    }
}
