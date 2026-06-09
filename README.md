# Oilgate Realty Calculators

Free real estate calculators for buyers, owners, and investors — built for quick decision-making.

**Live site:** https://oilgate-realty-calculators.netlify.app

---

## Calculators Included

| # | Calculator | What It Does |
|---|-----------|--------------|
| 1 | **Mortgage Payment** | Estimates monthly P&I + taxes + insurance + HOA + PMI |
| 2 | **Cap Rate** | Computes NOI and cap rate from rent and expenses |
| 3 | **Cash-on-Cash Return** | Annual cash flow / cash invested |
| 4 | **Cash-Out Refi** | Estimates cash-out proceeds at a target LTV |
| 5 | **Rent vs. Sell** | Compares net sale proceeds vs. rental cash flow |
| 6 | **STR Revenue** | Short-term rental revenue and net cash flow (manual inputs only) |
| 7 | **Closing Costs** | Line-by-line closing cost estimator + title company email template |

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 6** (build tool)
- **Tailwind CSS 3** (styling)
- **No backend. No database. No auth. No API keys.**
- 100% static — deployable to Netlify, Vercel, GitHub Pages, or any CDN

---

## Local Development

### Prerequisites
- Node.js 18+ (tested on v24)
- npm 9+

### Install & Run

```bash
npm install
npm run dev
```

Opens at: http://localhost:5176

**On your phone (same Wi-Fi):**
1. Run `ipconfig` on Windows to find your IPv4 address (e.g., 192.168.1.100)
2. Open `http://192.168.1.100:5176` on your phone
3. Windows Firewall may prompt you to allow Node.js — allow it

### Build

```bash
npm run build
```

Output goes to `dist/`. TypeScript type-checking runs first.

### Preview Build Locally

```bash
npm run preview
```

Opens at: http://localhost:4173

---

## Project Structure

```
src/
  App.tsx                    — Main app with tab navigation
  main.tsx                   — React entry point
  index.css                  — Tailwind + component styles
  components/
    Header.tsx               — Site header with logo
    Hero.tsx                 — Hero section
    HowToUse.tsx             — How-to section
    Disclaimer.tsx           — Legal disclaimer
    CTASection.tsx           — Contact CTA
    CalcShared.tsx           — Shared InputField, OutputRow, CopyButton
    calculators/
      MortgageCalculator.tsx
      CapRateCalculator.tsx
      CashOnCashCalculator.tsx
      CashOutRefiCalculator.tsx
      RentVsSellCalculator.tsx
      STRRevenueCalculator.tsx
      ClosingCostCalculator.tsx
  utils/
    format.ts                — Currency, percent, and number formatters
public/
  ogr-logo.png               — Oilgate Realty logo (transparent PNG)
```

---

## Deployment

See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for full Netlify instructions.

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20 (set in netlify.toml)

---

## Repo

- **GitHub:** https://github.com/oilgaterealty/oilgate-realty-calculators
- **Owner:** Oilgate Realty LLC

---

## Disclaimer

These calculators provide estimates only and are not financial advice, loan commitments, or professional guidance. Always verify numbers with your lender, title company, CPA, and licensed real estate professionals.
