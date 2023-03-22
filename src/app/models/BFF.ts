
/**
 * リフレッシュトークンのリクエスト
 */
export interface getversion {
    version: string
}
export interface getauthurl {
    authURL: string
    IsAuthorized: number
}
export interface getlourl {
    logoutURL: string
    IsAuthorized: number
}