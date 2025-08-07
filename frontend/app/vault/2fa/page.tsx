'use client';

import { useState, useEffect } from 'react';
import { 
  RiShieldKeyholeLine,
  RiAddLine,
  RiSearchLine,
  RiEditLine,
  RiDeleteBinLine,
  RiFileCopyLine,
  RiQrCodeLine,
  RiTimeLine
} from 'react-icons/ri';
import { Button, Card, TextArea, TextField, Dialog } from '@radix-ui/themes';
import { TwoFAAccount } from '@/types/TwoFAAccount';
import { generateTOTP } from '@/lib/2fa/generateTOTP';
import { getTimeColor } from '@/lib/2fa/getTimeColor';
import { copyToClipboard } from '@/lib/copy/copyToClipboard';



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
  const [newAccount, setNewAccount] = useState({
    title: '',
    issuer: '',
    accountName: '',
    secret: '',
    notes: ''
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
            <Dialog.Root open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <Dialog.Trigger>
                <Button style={{backgroundColor: 'white', color: 'black', cursor: 'pointer'}} className="border-0 w-fit">
                  <RiAddLine className="w-4 h-4 mr-2" />
                  Add 2FA
                </Button>
              </Dialog.Trigger>
              <Dialog.Content className="bg-gray-800 border-gray-700 text-white">
                  <Dialog.Title>Add New 2FA Account</Dialog.Title>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title">Title</label>
                    <TextField.Root
                      id="title"
                      value={newAccount.title}
                      onChange={(e) => setNewAccount({...newAccount, title: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., GitHub, Google"
                    />
                  </div>
                  <div>
                    <label htmlFor="issuer">Issuer</label>
                    <TextField.Root
                      id="issuer"
                      value={newAccount.issuer}
                      onChange={(e) => setNewAccount({...newAccount, issuer: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Service provider name"
                    />
                  </div>
                  <div>
                    <label htmlFor="accountName">Account Name</label>
                    <TextField.Root
                      id="accountName"
                      value={newAccount.accountName}
                      onChange={(e) => setNewAccount({...newAccount, accountName: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Email or username"
                    />
                  </div>
                  <div>
                    <label htmlFor="secret">Secret Key</label>
                    <TextField.Root
                      id="secret"
                      value={newAccount.secret}
                      onChange={(e) => setNewAccount({...newAccount, secret: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Base32 secret from QR code"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Enter the secret key from the QR code or manual setup
                    </p>
                  </div>
                  <div>
                    <label htmlFor="notes">Notes (Optional)</label>
                    <TextArea
                      id="notes"
                      value={newAccount.notes}
                      onChange={(e) => setNewAccount({...newAccount, notes: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Additional notes..."
                    />
                  </div>
                  <Button style={{backgroundColor: 'white', color: 'black', cursor: 'pointer'}} onClick={handleAddAccount} className="w-full">
                    Add 2FA Account
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Root>
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
        <div className="space-y-4">
          {filteredAccounts.map((account) => (
            <Card key={account.id} className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-200">
              <Card className="p-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-0">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="lg:w-12 lg:h-12 hidden bg-gray-700/50 rounded-lg lg:flex items-center justify-center">
                      <RiQrCodeLine className="lg:size-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{account.title}</h3>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">Issuer:</span>
                          <span className="text-white text-sm">{account.issuer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">Account:</span>
                          <span className="text-white text-sm">{account.accountName}</span>
                        </div>
                        {account.notes && (
                          <div className="flex items-start gap-2">
                            <span className="text-gray-400 text-sm">Notes:</span>
                            <span className="text-gray-300 text-sm">{account.notes}</span>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                          Created: {account.createdAt}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* TOTP Code Display */}
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-3xl font-mono font-bold text-white tracking-wider">
                          {account.currentCode}
                        </span>
                        <Button
                          variant="ghost"
                          size="1"
                          onClick={() => copyToClipboard(account.currentCode)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                        >
                          <RiFileCopyLine className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <RiTimeLine className={`w-3 h-3 ${getTimeColor(account.timeRemaining)}`} />
                        <span className={`text-xs font-medium ${getTimeColor(account.timeRemaining)}`}>
                          {account.timeRemaining}s
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="1"
                        className="text-gray-400 hover:text-white"
                      >
                        <RiEditLine className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="1"
                        onClick={() => handleDeleteAccount(account.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <RiDeleteBinLine className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Card>
          ))}
        </div>

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