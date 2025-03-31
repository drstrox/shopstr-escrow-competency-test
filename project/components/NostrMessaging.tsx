"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateNostrKeys, createGiftWrappedMessage, decryptGiftWrappedMessage } from '@/lib/nostr';
import type { NostrKeys } from '@/lib/nostr';

export default function NostrMessaging() {
  const [keys, setKeys] = useState<NostrKeys | null>(null);
  const [recipientPubKey, setRecipientPubKey] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<any[]>([]);

  const handleGenerateKeys = () => {
    const newKeys = generateNostrKeys();
    setKeys(newKeys);
  };

  const handleSendMessage = () => {
    if (!keys || !recipientPubKey || !message) return;

    const event = createGiftWrappedMessage(
      message,
      recipientPubKey,
      keys.privateKey
    );

    // In a real app, this would publish to Nostr relays
    console.log('Sending message:', event);
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Keys</h3>
        {keys ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Public Key: {keys.publicKey}</p>
            <p className="text-sm text-muted-foreground">Private Key: {keys.privateKey}</p>
          </div>
        ) : (
          <Button onClick={handleGenerateKeys}>Generate Keys</Button>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Send Message</h3>
        <Input
          placeholder="Recipient's Public Key"
          value={recipientPubKey}
          onChange={(e) => setRecipientPubKey(e.target.value)}
        />
        <Textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage} disabled={!keys || !recipientPubKey || !message}>
          Send Gift-Wrapped Message
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Received Messages</h3>
        {receivedMessages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages received yet</p>
        ) : (
          <div className="space-y-2">
            {receivedMessages.map((msg, index) => (
              <div key={index} className="p-4 border rounded">
                <p>{msg.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}