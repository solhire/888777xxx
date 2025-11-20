# ZENTH // TECH TASKS & INTEGRATION

## Overview
Frontend is strictly view-layer and mocking wallet signatures. Real payout logic must be handled server-side or via smart contract.

## Backend API Endpoints (Required)

### Auth
- `POST /api/auth/challenge`
  - Input: `{ publicKey: string }`
  - Output: `{ nonce: string, message: string }`
- `POST /api/auth/verify`
  - Input: `{ publicKey: string, signature: string, nonce: string }`
  - Output: `{ sessionToken: string }`

### Rewards (Critical)
- `GET /api/rewards/pending/:publicKey`
  - Returns: Array of claimable rewards (amount, reason, signature_id).
- `POST /api/rewards/create-claim`
  - Input: `{ rewardId: string, sessionToken: string }`
  - **SECURITY:** Backend must verify user eligibility in DB before generating transaction.
  - Output: `{ transaction: base64_encoded_transaction }` (Escrow payout tx)
- `POST /api/rewards/confirm`
  - Input: `{ txHash: string }`
  - Action: Verify on-chain inclusion, then mark reward as 'claimed' in DB.

## On-Chain Strategy (Solana)

**Option A: Escrow Smart Contract (Recommended)**
- Deposit funds into a Program (PDA).
- Backend signs a "withdraw authority" instruction.
- Frontend combines user signature + backend authority to release funds.
- **Pros:** Non-custodial feel, transparent.
- **Cons:** Higher dev effort.

**Option B: Batched Payouts (Hot Wallet)**
- Backend runs a cron job to disperse SOL to winners.
- **Pros:** Easier to implement.
- **Cons:** Custodial risk, gas fees on backend.

## Security Notes
1. **NEVER** store private keys in frontend code.
2. `window.solana` is client-side; spoofing is possible. Always verify signatures server-side.
3. Rate limit `/api/auth` endpoints to prevent spam.
4. Validate all claims against game telemetry logs before issuing payouts.