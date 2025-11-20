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