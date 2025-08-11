'use client'

import { Add2faDialogProps } from '@/types/TwoFAAccount'
import { Button, Dialog, TextArea, TextField } from '@radix-ui/themes'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { RiAddLine } from 'react-icons/ri'


const Add2faDialog: React.FC<Add2faDialogProps>  = ({ 
    isAddDialogOpen, 
    setIsAddDialogOpen, 
    newAccount, 
    setNewAccount, 
    handleAddAccount 
}) => {

  
  return (
    <>
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
                  <Button color='green' style={{cursor: 'pointer'}} onClick={handleAddAccount} className="w-full">
                    Add 2FA Account
                  </Button>
                </div>
              </Dialog.Content>
        </Dialog.Root>        
    </>
  )
}

export default Add2faDialog