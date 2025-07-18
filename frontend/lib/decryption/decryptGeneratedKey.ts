import { base64ToUint8Array } from "@/utils/encoding";
import argon2 from 'argon2-browser/dist/argon2-bundled.min.js';


export const decryptGeneratedKey = async (  
  base64Salt: string,
  base64IV: string,
  base64EncryptedVaultKey: string,
  masterPassword: string
): Promise<string> => {

  const salt = base64ToUint8Array(base64Salt);
  const iv = base64ToUint8Array(base64IV);
  const encryptedVaultKey = base64ToUint8Array(base64EncryptedVaultKey);

  // Derive key using Argon2id
  const { hash: derivedKey } = await argon2.hash({
    pass: masterPassword,
    salt,
    time: 3,
    mem: 65536,
    hashLen: 32,
    type: argon2.ArgonType.Argon2id,
  });

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    derivedKey,
    'AES-GCM',
    false,
    ['decrypt']
  );

  try {
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      encryptedVaultKey
    );

    const decryptedVaultKey = new TextDecoder().decode(decryptedBuffer);
    return decryptedVaultKey;
  } catch {
    throw new Error('Wrong Master Key');
  }

};