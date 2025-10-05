'use client';

import { useState, useEffect } from 'react';
import { 
  RiShieldKeyholeLine,
  RiAddLine,
  RiSearchLine,
} from 'react-icons/ri';
import { Button, TextField } from '@radix-ui/themes';
import { TwoFAAccount, TwoFAAccountForm } from '@/types/TwoFAAccount';
import { generateTOTP } from '@/lib/2fa/generateTOTP';
import axios from 'axios';
import { config } from '@/config/config';
import { useAppSelector } from '@/redux/hooks';
import { decryptSecret, encryptSecret } from 'cryptonism';
import Add2faDialog from '@/components/2fa/Add2faDialog';
import AccountLists2fa from '@/components/2fa/AccountLists2fa';
import toast from 'react-hot-toast';



const mock2FAAccounts: TwoFAAccount[] = [];

export default function TwoFAPage() {

  const [accounts, setAccounts] = useState<TwoFAAccount[]>(mock2FAAccounts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState<TwoFAAccountForm>({
    title: '',
    issuer: '',
    accountName: '',
    secret: '',
    notes: '',
  });


  // Update TOTP codes every 1s
  useEffect(() => {
    const interval = setInterval(() => {
      setAccounts(prevAccounts => 
        prevAccounts.map(account => {
          const { code, timeRemaining } = generateTOTP(account.secret);
          return {
            ...account,
            currentCode: code,
            timeRemaining
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { decryptedVaultKey } = useAppSelector(state => state.auth);

  useEffect(() => {
      async function fetchAccounts() {
       try {
         const res = await axios.get(`${config.backend}/api/vault/2fa`, { withCredentials: true });
         const items = res.data.items as Array<{ id: string; title: string; issuer: string; accountName: string; notes?: string; encryptedSecret: string; iv: string; createdAt: string; }>;
         const mapped = await Promise.all(items.map(async (i) => {
            if(!decryptedVaultKey) {
              return { id: i.id, title: i.title, issuer: i.issuer, accountName: i.accountName, secret: '', currentCode: '------', timeRemaining: 0, notes: i.notes, createdAt: i.createdAt } as TwoFAAccount;
            }
            const dec = await decryptSecret({ encryptedSecret: i.encryptedSecret, iv: i.iv, decryptedKey: decryptedVaultKey });
            const secret = dec?.success ? dec.decryptedSecret : '';
            const { code, timeRemaining } = generateTOTP(secret || '');
            return { id: i.id, title: i.title, issuer: i.issuer, accountName: i.accountName, secret, currentCode: code, timeRemaining, notes: i.notes, createdAt: i.createdAt } as TwoFAAccount;
         }));
         setAccounts(mapped);
       } catch (error) {
         console.log('Failed to fetch accounts:', error);
         toast.error('Something went wrong!')
       }
      }

      fetchAccounts();
  }, [decryptedVaultKey]);

  const filteredAccounts = accounts.filter(account =>
    account.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAccount = async () => {
    try {
      if(!newAccount.title || !newAccount.accountName || !newAccount.secret) return;
      if(!decryptedVaultKey) return;
      const enc = await encryptSecret({ secret: newAccount.secret, decryptedKey: decryptedVaultKey });
      if(!enc?.success) throw new Error('encrypt-failed');
      const res = await axios.post(`${config.backend}/api/vault/2fa`, {
        title: newAccount.title,
        issuer: newAccount.issuer,
        accountName: newAccount.accountName,
        notes: newAccount.notes,
        encryptedSecret: enc.encryptedSecret,
        iv: enc.iv,
      }, { withCredentials: true });
      const created = res.data as { id: string };
      const { code, timeRemaining } = generateTOTP(newAccount.secret);
      const account: TwoFAAccount = {
        id: created.id,
        ...newAccount,
        currentCode: code,
        timeRemaining,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAccounts([...accounts, account]);
      setNewAccount({ title: '', issuer: '', accountName: '', secret: '', notes: '' });
      setIsAddDialogOpen(false);
    } catch (_) {
      toast.error('Something went wrong!');
    }
  };

  const handleDeleteAccount = async (id: string) => {
    try {
      await axios.delete(`${config.backend}/api/vault/2fa/${id}`, { withCredentials: true });
      setAccounts(accounts.filter(a => a.id !== id));
    } catch (_) {
      toast.error('Something went wrong!');
    }
  };

  return (
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 overflow-hidden">
            <div className='relative left-10 lg:left-0'>
              <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center ">
                <RiShieldKeyholeLine className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">2FA (TOTP)</h1>
                <p className="text-gray-400">{accounts.length} authenticator accounts</p>
              </div>
            </div>
            </div>
            <Add2faDialog 
              isAddDialogOpen={isAddDialogOpen} 
              setIsAddDialogOpen={setIsAddDialogOpen}
              newAccount={newAccount}
              setNewAccount={setNewAccount}
              handleAddAccount={handleAddAccount} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <TextField.Root
              placeholder="Search 2FA accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700/50"
            >
             <TextField.Slot>
               <RiSearchLine className="size-4 text-gray-400" />
             </TextField.Slot>
            </TextField.Root>
          </div>
        </div>

        {/* 2FA Accounts List */}
        <AccountLists2fa 
        filteredAccounts={filteredAccounts} 
        handleDeleteAccount={handleDeleteAccount} />

        {filteredAccounts.length === 0 && (
          <div className="text-center py-12">
            <RiShieldKeyholeLine className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No 2FA accounts found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Add your first 2FA account to get started'}
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              style={{backgroundColor: 'white', color: 'black', cursor: 'pointer'}} 
            >
              <RiAddLine className="size-4 mr-2" />
              Add 2FA Account
            </Button>
          </div>
        )}
      </div>
  );
}