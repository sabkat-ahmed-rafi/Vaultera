import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string): Promise<string> {
  const hashed = await bcrypt.hash(plainPassword, 12);
  return hashed;
}