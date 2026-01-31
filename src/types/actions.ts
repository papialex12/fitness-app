export type ActionResponse<T = void> = {
    success: boolean
    message?: string
    data?: T
    errors?: Record<string, string[] | string>
}
