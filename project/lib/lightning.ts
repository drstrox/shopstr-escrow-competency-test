export interface HodlInvoice {
  paymentHash: string;
  paymentRequest: string;
  preimage: string;
  amount: number;
  expiryTime: number;
}

export function createHodlInvoice(
  amount: number,
  expirySeconds: number
): HodlInvoice {
  // This is a simplified implementation
  // In a real application, this would interact with an LND node
  return {
    paymentHash: crypto.randomUUID(),
    paymentRequest: `lnbc${amount}...`, // Simplified invoice format
    preimage: crypto.randomUUID(),
    amount,
    expiryTime: Date.now() + (expirySeconds * 1000),
  };
}

export function settleHodlInvoice(invoice: HodlInvoice): boolean {
  // This is a simplified implementation
  // In a real application, this would interact with an LND node
  return Date.now() < invoice.expiryTime;
}