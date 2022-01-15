export type ApiRequestConfig = {
    path: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    query?: Record<string, any>
    headers?: Record<string, string>
    body?: Record<any, any>
}