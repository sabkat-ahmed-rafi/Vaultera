# Vaultera

Vaultera is a secure password manager designed to safely store and manage your sensitive information. All user data is **end-to-end encrypted** using the custom [Cryptonism](https://github.com/sabkat-ahmed-rafi/Cryptonism) library, ensuring that only you have access to your passwords.

## Features

- **End-to-End Encryption:** All data is encrypted before leaving your device.
- **Secure Storage:** Safely store passwords, notes, and sensitive information.
- **Cross-Platform:** Works on multiple platforms via the web interface.
- **Zero-Knowledge Architecture:** Your data remains private and unreadable by anyone, including the developers.

## Built With
- **Frontend:** TypeScript, Next.js
- **Bacekend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Encryption:** [Cryptonism](https://github.com/sabkat-ahmed-rafi/Cryptonism)

## Installation

Clone the repository:
```bash 
git clone https://github.com/sabkat-ahmed-rafi/Vaultera.git

cd Vaultera 
```

## Security
Vaultera uses Cryptonism, a custom encryption library, to encrypt and decrypt all user data. Your passwords are never stored in plaintext on the server, making Vaultera a truly secure solution.
