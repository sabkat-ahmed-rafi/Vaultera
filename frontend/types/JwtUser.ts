export interface JwtUser { 
  id: string;
  email: string;
  name: string;
  photo: string | null;
  [key: string]: unknown;
}