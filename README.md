# Il Ristoro di Ercole - Order App

A simple Progressive Web App (PWA) for receiving orders via Telegram notifications.

**Live Demo:** https://il-ristoro.vercel.app/

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CUSTOMER                                    │
│                                                                          │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│   │  Scan QR     │───►│  Browse &    │───►│  Submit      │              │
│   │  Install PWA │    │  Build Cart  │    │  Order       │              │
│   └──────────────┘    └──────────────┘    └──────┬───────┘              │
│                                                   │                      │
└───────────────────────────────────────────────────┼──────────────────────┘
                                                    │
                                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         VERCEL (Free Tier)                               │
│                                                                          │
│   ┌────────────────────────┐    ┌────────────────────────┐              │
│   │   Static PWA Files     │    │   /api/order           │              │
│   │   (React App)          │    │   Serverless Function  │              │
│   └────────────────────────┘    └───────────┬────────────┘              │
│                                              │                           │
└──────────────────────────────────────────────┼───────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         TELEGRAM BOT API                                 │
└──────────────────────────────────────────────┬───────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            SHOP OWNER                                    │
│   📱 Receives order notification on Telegram                            │
└─────────────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Hosting | Vercel (free tier) |
| Backend | Vercel Serverless Function |
| Notifications | Telegram Bot API |

## Project Structure

```
IlRistoro/
├── api/
│   └── order.ts             # Serverless function (Telegram proxy)
├── public/
│   ├── icons/               # PWA icons
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── logo.jpg             # Shop logo
│   ├── bg.jpg               # Background image
│   ├── manifest.json        # PWA manifest
│   └── sw.js                # Service worker
├── src/
│   ├── components/          # React components
│   │   ├── Cart.tsx
│   │   ├── CategoryTabs.tsx
│   │   ├── Confirmation.tsx
│   │   ├── Header.tsx
│   │   ├── Menu.tsx
│   │   ├── OrderForm.tsx
│   │   └── ProductCard.tsx
│   ├── data/
│   │   └── products.ts      # Menu items (edit this!)
│   ├── hooks/
│   │   └── useCart.ts       # Cart state management
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables (local)
├── eslint.config.js         # ESLint configuration
├── index.html
├── vercel.json              # Vercel deployment config
├── vite.config.ts           # Vite configuration
└── package.json
```

## Setup Instructions

### 1. Create Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the prompts
3. Save the bot token (looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
4. Start a chat with your new bot
5. Get your chat ID:
   - Send a message to your bot
   - Visit `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Find `"chat":{"id":XXXXXXXXX}` — that's your chat ID

### 2. Install Dependencies

```bash
yarn
```

### 3. Configure Environment

Create `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 4. Update Menu (Optional)

Edit `src/data/products.ts` to update prices or add items.

### 5. Run Locally

```bash
npx vercel dev
```

### 6. Deploy to Vercel

```bash
yarn global add vercel
vercel
```

Then set environment variables in Vercel dashboard:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### 7. Generate QR Code

Generate a QR code for your Vercel URL and display it in the shop!

## Updating the Menu

Edit `src/data/products.ts` and redeploy:

```bash
npx vercel --prod
```

## Cost

| Service | Cost |
|---------|------|
| Vercel Hosting | Free |
| Telegram Bot | Free |
| Domain (optional) | ~€10/year |

**Total: €0/year** (or ~€10 with custom domain)

## TODO

- [ ] Add prices for Taglieri (piccolo, medio, grande)
- [ ] Add prices for Fritti (Supplì, Patatine fritte)
