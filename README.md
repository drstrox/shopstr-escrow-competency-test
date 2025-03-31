# Secure Payment Escrow System

## Overview
This repository contains the implementation for the Shopstr Escrow Competency Test. The project that combines multiple technologies, including Nostr (a decentralized messaging protocol), Cashu (a Chaumian ecash system), and Bitcoin Lightning Network invoices. 

## Features
- Secure escrow transactions
- Send and receive gift-wrapped Nostr messages
- Can create and spend a P2PK-locked Cashu token
- Payment processing
- Create and spend from a HODL invoice

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/drstrox/shopstr-escrow-competency-test.git
   cd shopstr-escrow-competency-test
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (create a `.env` file based on `.env.example`):
   ```sh
   cp .env.example .env
   ```
   Update the necessary environment values.

## Usage
To start the project, run:
```sh
npm start
```
If using a development server:
```sh
npm run dev
```

