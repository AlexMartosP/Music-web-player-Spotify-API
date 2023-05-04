export interface AuthType {
  response_type: string;
  client_id: string;
  scope: string;
  redirect_uri: string;
  state: string;
  code_challenge_method: "S256";
  code_challenge: string;
}

export interface ReqAccessType {
  grant_type: "authorization_code";
  client_id: string;
  redirect_uri: string;
  code: string;
  code_verifier: string;
}

export interface AccesTokenStorage {
  token: string;
  expires_at: number;
}
