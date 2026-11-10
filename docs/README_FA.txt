VEXO COIN — VEXO COMPANY
========================

Firebase project configured:
- Project: vexo-v2
- Realtime Database: vexo-v2-default-rtdb
- Functions region: us-central1

Included:
- Firebase Authentication integration
- Callable Cloud Functions for player setup, game, multiplayer, admin tools,
  subscription administration and TON Testnet order flow
- Database rules (server-only writes for balances and protected records)
- User coin/wallet artwork under assets/coins/

IMPORTANT — deployment is not performed by this ZIP:
1) Install Node.js 20 and Firebase CLI.
2) Run `firebase login` with an account authorized for vexo-v2.
3) From this folder run `firebase use vexo-v2`.
4) Run `cd functions && npm install && cd ..`.
5) Review functions/.env.example and the OWNER_EMAIL in functions/index.js.
6) Deploy with `firebase deploy`.
7) In Firebase Console enable the sign-in providers used by login.html.
8) Configure App Check, billing/quotas, and review all rules/functions before
   allowing real users or real-money transactions.

Payment note:
The current TON flow is explicitly TESTNET. It does not establish real-money
settlement or withdrawal. Do not label testnet credits as cash or enable
withdrawals without a verified production payment/ledger system and legal review.

Security:
- Never put Firebase Admin credentials/service-account JSON in the browser or ZIP.
- Firebase web config is public by design; protect data with Authentication,
  Realtime Database Rules, server validation, and App Check.
- Owner/admin privileges must be granted only through trusted server-side claims.
