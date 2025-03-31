import { getPublicKey, getEventHash, signEvent } from 'nostr-tools';
import type { Event } from 'nostr-tools';

export interface NostrKeys {
  publicKey: string;
  privateKey: string;
}

export function generateNostrKeys(): NostrKeys {
  const privateKey = window.crypto.getRandomValues(new Uint8Array(32));
  const publicKey = getPublicKey(privateKey);
  
  return {
    publicKey,
    privateKey: privateKey.toString(),
  };
}

export function createGiftWrappedMessage(
  content: string,
  recipientPubKey: string,
  privateKey: string
): Event {
  const event: Event = {
    kind: 1059, // NIP-17 gift-wrapped event kind
    pubkey: getPublicKey(privateKey),
    created_at: Math.floor(Date.now() / 1000),
    tags: [['p', recipientPubKey]],
    content: content,
    sig: '' // Will be set after signing
  };

  event.id = getEventHash(event);
  event.sig = signEvent(event, privateKey);

  return event;
}

export function decryptGiftWrappedMessage(event: Event, privateKey: string): string {
  // Implement decryption logic according to NIP-17
  // This is a placeholder - actual implementation would use proper encryption/decryption
  return event.content;
}