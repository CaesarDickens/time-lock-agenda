# Environment Setup Guide

This guide explains how to configure environment variables for the Encrypted Study Schedule project.

## Required Environment Variables

### For Development

Create a `.env.local` file in the project root with the following variables:

```bash
# Infura API Key for Sepolia testnet
INFURA_API_KEY=your_infura_api_key_here

# WalletConnect Project ID for RainbowKit
WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Private Key for contract deployment (development only)
PRIVATE_KEY=your_private_key_here

# Contract address after deployment
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address_here
```

### Getting API Keys

1. **Infura API Key**: Sign up at [infura.io](https://infura.io) and create a new project
2. **WalletConnect Project ID**: Get from [cloud.walletconnect.com](https://cloud.walletconnect.com)

### Security Notes

- Never commit `.env.local` files to version control
- Use environment variables instead of hardcoding sensitive data
- Rotate API keys regularly in production
- Use different keys for development and production

### Vercel Deployment

When deploying to Vercel, set these environment variables in your Vercel dashboard:

- `INFURA_API_KEY`
- `WALLET_CONNECT_PROJECT_ID`
- `NEXT_PUBLIC_CONTRACT_ADDRESS`

Vercel will automatically set `VERCEL_URL` for you.
