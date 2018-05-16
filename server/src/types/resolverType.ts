export interface ResolverMap {
    [key: string]: {
        [key: string]: (
            parent: any,
            args: any,
            context: { user: number; expo: any },
            info: any
        ) => any
    }
}
