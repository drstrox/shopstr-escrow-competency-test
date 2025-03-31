"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NostrMessaging from '@/components/NostrMessaging';
import CashuTokens from '@/components/CashuTokens';
import LightningInvoices from '@/components/LightningInvoices';

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Nostr + Cashu + Lightning Integration
      </h1>
      
      <Tabs defaultValue="nostr" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nostr">Nostr Messages</TabsTrigger>
          <TabsTrigger value="cashu">Cashu Tokens</TabsTrigger>
          <TabsTrigger value="lightning">Lightning HODL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nostr">
          <Card>
            <CardHeader>
              <CardTitle>Gift-Wrapped Nostr Messages</CardTitle>
              <CardDescription>
                Send and receive encrypted messages using NIP-17
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NostrMessaging />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cashu">
          <Card>
            <CardHeader>
              <CardTitle>P2PK-Locked Cashu Tokens</CardTitle>
              <CardDescription>
                Create and spend tokens locked to specific public keys
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CashuTokens />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lightning">
          <Card>
            <CardHeader>
              <CardTitle>Lightning HODL Invoices</CardTitle>
              <CardDescription>
                Create and settle time-locked Lightning payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LightningInvoices />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}