import { uint8ArrayToBase64 } from '@/utils/encoding';
import * as argon2 from 'argon2-browser';

export const generateEncryptedKey = async (masterPassword: string) => {
    // 1. Generate random salt (32 bytes)
    const salt = crypto.getRandomValues(new Uint8Array(32));

    // 2. Derive key from master password using Argon2id
    const { hash: derivedKey } = await argon2.hash({
        pass: masterPassword,
        salt,
        time: 3,
        mem: 65536,
        hashLen: 32,
        type: argon2.ArgonType.Argon2id,
    });

    // 3. Generate vault key (AES key, 32 bytes)
    const vaultKey = crypto.getRandomValues(new Uint8Array(32));

    // 4. Encrypt the vault key with AES-GCM
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        derivedKey,
        'AES-GCM',
        false,
        ['encrypt']
    );

    const encryptedVaultKey = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        vaultKey
    );
    const encryptedVaultKeyUint8 = new Uint8Array(encryptedVaultKey);

    return {
        encryptedVaultKey: uint8ArrayToBase64(encryptedVaultKeyUint8),
        salt: uint8ArrayToBase64(salt),
        iv: uint8ArrayToBase64(iv),
    }

}