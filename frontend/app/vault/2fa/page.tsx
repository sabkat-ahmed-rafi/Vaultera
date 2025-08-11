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
import Add2faDialog from '@/components/2fa/Add2faDialog';
import AccountLists2fa from '@/components/2fa/AccountLists2fa';



const mock2FAAccounts: TwoFAAccount[] = [
  {
    id: '1',
    title: 'GitHub',
    issuer: 'GitHub',
    accountName: 'john.doe@email.com',
    secret: 'JBSWY3DPEHPK3PXP',
    currentCode: '123456',
    timeRemaining: 15,
    notes: 'Work account 2FA',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Google Account',
    issuer: 'Google',
    accountName: 'john.doe@gmail.com',
    secret: 'HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ',
    currentCode: '789012',
    timeRemaining: 25,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'AWS Console',
    issuer: 'Amazon Web Services',
    accountName: 'john.doe@company.com',
    secret: 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ',
    currentCode: '345678',
    timeRemaining: 8,
    notes: 'Company AWS account',
    createdAt: '2024-01-05'
  }
];

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




//   useEffect(() => {
//       async function fetchAccounts() {
//        try {
//          const res = await axios.get('/api/accounts');
//          const data = res.data;

//           // Calculate initial TOTP codes for each account
//           const updated = data.map((account: TwoFAAccount) => {
//             const { code, timeRemaining } = generateTOTP(account.secret);
//             return {
//               ...account,
//               currentCode: code,
//               timeRemaining,
//             };
//           });

//           setAccounts(updated);
//         } catch (error) {
//           console.error('Failed to fetch accounts:', error);
//         }
//       }

//       fetchAccounts();
//   }, []);



  // Update TOTP codes every 30 seconds
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

  const filteredAccounts = accounts.filter(account =>
    account.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAccount = () => {
    console.log(newAccount)
    const account: TwoFAAccount = {
      id: Date.now().toString(),
      ...newAccount,
      currentCode: '000000',
      timeRemaining: 30,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAccounts([...accounts, account]);
    setNewAccount({ title: '', issuer: '', accountName: '', secret: '', notes: '' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
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