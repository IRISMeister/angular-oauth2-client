
/**
 * リフレッシュトークンのリクエスト
 */
export interface RefreshTokenRequest {
    client_id: string
    refresh_token: string
    scope: string
    grant_type: string
  }

/**
 * トークンエンドポイントへのリクエスト
 */
export interface TokenEndPointRequest {
    client_id: string
    grant_type: string
    code: string
    code_verifier: string,
    redirect_uri: string
  }
  
  /**
   * トークンエンドポイントのレスポンス
   */
export interface TokenEndPointResponse {
    access_token: string
    id_token: string
    refresh_token: string
    expires_in: string
    scope: string
    token_type: string
  }

export interface UserInfo {
  sub: string
  name: string
}