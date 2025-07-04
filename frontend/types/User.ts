export interface AuthUserData {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface UpdateUserPayload {
  name?: string | null;
}