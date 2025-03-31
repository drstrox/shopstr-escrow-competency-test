"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createHodlInvoice, settleHodlInvoice } from '@/lib/lightning';
import type { HodlInvoice } from '@/lib/lightning';

export default function LightningInvoices() {
  const [amount, setAmount] = useState('');
  const [expirySeconds, setExpirySeconds] = useState('3600');
  const [invoice, setInvoice] = useState<HodlInvoice | null>(null);

  const handleCreateInvoice = () => {
    if (!amount || !expirySeconds) return;

    const newInvoice = createHodlInvoice(
      parseInt(amount),
      parseInt(expirySeconds)
    );
    setInvoice(newInvoice);
  };

  const handleSettleInvoice = () => {
    if (!invoice) return;

    const success = settleHodlInvoice(invoice);
    if (success) {
      setInvoice(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Create HODL Invoice</h3>
        <Input
          type="number"
          placeholder="Amount (sats)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Expiry (seconds)"
          value={expirySeconds}
          onChange={(e) => setExpirySeconds(e.target.value)}
        />
        <Button onClick={handleCreateInvoice} disabled={!amount || !expirySeconds}>
          Create HODL Invoice
        </Button>
      </div>

      {invoice && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Invoice Details</h3>
          <div className="p-4 border rounded space-y-2">
            <p>Payment Hash: {invoice.paymentHash}</p>
            <p>Amount: {invoice.amount} sats</p>
            <p>Expires: {new Date(invoice.expiryTime).toLocaleString()}</p>
            <p className="break-all">
              Payment Request: {invoice.paymentRequest}
            </p>
          </div>
          <Button onClick={handleSettleInvoice}>
            Settle Invoice
          </Button>
        </div>
      )}
    </div>
  );
}