"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createP2PKToken, spendP2PKToken } from '@/lib/cashu';
import type { CashuToken } from '@/lib/cashu';

export default function CashuTokens() {
  const [amount, setAmount] = useState('');
  const [recipientPubKey, setRecipientPubKey] = useState('');
  const [token, setToken] = useState<CashuToken | null>(null);
  const [spendKey, setSpendKey] = useState('');

  const handleCreateToken = () => {
    if (!amount || !recipientPubKey) return;

    const newToken = createP2PKToken(
      parseInt(amount),
      recipientPubKey
    );
    setToken(newToken);
  };

  const handleSpendToken = () => {
    if (!token || !spendKey) return;

    const success = spendP2PKToken(token, spendKey);
    if (success) {
      setToken(null);
      setSpendKey('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Create Token</h3>
        <Input
          type="number"
          placeholder="Amount (sats)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          placeholder="Recipient's Public Key"
          value={recipientPubKey}
          onChange={(e) => setRecipientPubKey(e.target.value)}
        />
        <Button onClick={handleCreateToken} disabled={!amount || !recipientPubKey}>
          Create P2PK Token
        </Button>
      </div>

      {token && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Token Details</h3>
          <div className="p-4 border rounded space-y-2">
            <p>Token ID: {token.id}</p>
            <p>Amount: {token.amount} sats</p>
            <p>Locked to: {token.pubkey}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Spend Token</h3>
        <Input
          placeholder="Private Key to Spend"
          value={spendKey}
          onChange={(e) => setSpendKey(e.target.value)}
        />
        <Button onClick={handleSpendToken} disabled={!token || !spendKey}>
          Spend Token
        </Button>
      </div>
    </div>
  );
}