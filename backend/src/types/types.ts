
export interface UserData {
  email: string;
  name: string;
  photo: string;
  password: string;
  salt: string;              // base64
  iv: string;                // base64
  encryptedVaultKey: string; // base64
}

export interface GetUserByEmailProp {
    email: string
}

export interface JwtUser { 
  id: string | null;
  email: string | null;
  name: string | null;
  photo: string | null;
  [key: string]: unknown;
}