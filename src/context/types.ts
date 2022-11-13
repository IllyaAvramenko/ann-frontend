export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type AsyncAction<T = any[]> = { data?: T, isLoading?: boolean, error?: string | null };