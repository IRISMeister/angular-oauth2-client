
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
export interface logout {
    logoutURL: string
    IsAuthorized: number
}