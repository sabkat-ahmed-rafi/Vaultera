
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
  id: string;
  email: string;
  name: string;
  photo: string | null;
  [key: string]: unknown;
}

export type CreateTwoFAEntryInput = {
  userId: string;
  title: string;
  issuer: string;
  accountName: string;
  notes?: string | null;
  encryptedSecret: string;
  iv: string;
};
export type UpdateTwoFAEntryInput = Partial<Omit<CreateTwoFAEntryInput, "userId">>;

export type CreateEmailEntryInput = {
  userId: string;
  email: string;
  username: string;
  encryptedSecret: string;
  iv: string;
};
export type UpdateEmailEntryInput = Partial<Omit<CreateEmailEntryInput, "userId">>;


export type CreatePasswordEntryInput = {
  userId: string;
  name: string;
  username: string;
  url?: string | null;
  encryptedSecret: string;
  iv: string;
};

export type UpdatePasswordEntryInput = Partial<Omit<CreatePasswordEntryInput, "userId">>;
