import { getTimeColor } from '@/lib/2fa/getTimeColor'
import { copyToClipboard } from '@/lib/copy/copyToClipboard'
import { TwoFAAccount } from '@/types/TwoFAAccount'
import { Button, Card } from '@radix-ui/themes'
import React from 'react'
import { RiDeleteBinLine, RiEditLine, RiFileCopyLine, RiQrCodeLine, RiTimeLine } from 'react-icons/ri'

interface AccountLists2faProps {
    filteredAccounts: TwoFAAccount[];
    handleDeleteAccount: (id: string) => void;
}

const AccountLists2fa = ({ filteredAccounts, handleDeleteAccount }: AccountLists2faProps) => {
  return (
        <div className="space-y-4">
          {filteredAccounts.map((account) => (
            <Card key={account.id} className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-200">
              <Card className="p-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-0">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="lg:w-12 lg:h-12 hidden bg-gray-700/50 rounded-lg lg:flex items-center justify-center">
                      <RiQrCodeLine
                       className="lg:size-6 text-gray-400" />
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
  )
}

export default AccountLists2fa