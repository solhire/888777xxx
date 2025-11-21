# ZENTH Frontend

This is the React frontend for ZENTH, the premier competitive platform.

## Quick Start

1. Install dependencies:
   ```bash
   npm install react react-dom react-router-dom tailwindcss
   # dev dependencies
   npm install -D typescript @types/react @types/react-dom
   ```

2. Run:
   ```bash
   npm start
   ```

## Phantom Wallet Note
To test the wallet features, you must have the Phantom Wallet extension installed in your browser. The app runs on the Solana window object (`window.solana`).

## Architecture
- **Styling**: Tailwind CSS (configured via script injection in index.html for portability).
- **Router**: HashRouter used for simple static hosting compatibility.
- **Services**: Mock services located in `/services` folder.

## Solana RPC Configuration

The app uses Solana RPC endpoints to fetch wallet balances. By default, it uses `devnet` for development.

### Free RPC Endpoints

The app is configured to use **free public RPC endpoints** that don't require API keys:
- **Pocket Network** (default for mainnet): `https://solana.api.pocket.network` - Decentralized, no rate limits
- **dRPC** (alternative): `https://solana.drpc.org/` - Free public endpoint
- **Solana Foundation**: `https://api.mainnet-beta.solana.com` - Rate-limited, may return 403

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Network: 'devnet' | 'testnet' | 'mainnet-beta'
# Default: 'devnet' (recommended for development)
VITE_SOLANA_NETWORK=devnet

# Optional: Custom RPC URL (overrides network setting)
# For high-volume production, consider dedicated RPC providers (Helius, QuickNode, Alchemy)
# Example: VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
# VITE_SOLANA_RPC_URL=
```

### RPC Endpoint Issues

If you see `403 Forbidden` errors:
- The app now uses Pocket Network by default (no rate limits)
- For development: Use `devnet` (default)
- For production with high volume: Consider a dedicated RPC provider with an API key

### Notes

- **Tailwind CDN Warning**: The app uses Tailwind via CDN for development. For production, install Tailwind as a PostCSS plugin.
- **Buffer Module**: The Solana web3.js library requires the `buffer` polyfill in browser environments. Vite handles this automatically.