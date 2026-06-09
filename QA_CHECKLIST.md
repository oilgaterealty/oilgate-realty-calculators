# QA Checklist — Oilgate Realty Calculators

Use this checklist before every deployment.

---

## Build & Run Tests

- [ ] `npm install` — completes without errors
- [ ] `npm run build` — TypeScript check passes, Vite build succeeds
- [ ] `dist/` folder is created with `index.html` and assets
- [ ] `npm run dev` — dev server starts at http://localhost:5176
- [ ] `npm run preview` — preview server starts at http://localhost:4173

---

## Visual & Layout Tests

- [ ] Oilgate Realty logo appears in header (transparent, white inverted)
- [ ] Logo appears again in footer/CTA section
- [ ] Hero section displays correctly with headline, subheadline, and calculator chips
- [ ] Tab navigation shows all 7 calculator names
- [ ] Active tab is highlighted in navy
- [ ] Calculator card header shows correct title and description for each tab
- [ ] How-to-use section displays 4 steps
- [ ] Disclaimer section (yellow warning card) is visible
- [ ] CTA section shows at bottom with email/contact button
- [ ] Footer copyright year is correct

---

## Desktop Layout Tests (1280px+)

- [ ] Calculator inputs and outputs are side-by-side (inputs left, outputs right)
- [ ] All 7 tab labels display fully without wrapping awkwardly
- [ ] No horizontal scroll
- [ ] Logo is the right size in header

---

## Mobile Layout Tests (375px / iPhone)

- [ ] Header collapses gracefully — logo + Contact button
- [ ] Hero section is readable
- [ ] Tab navigation wraps onto multiple rows (no overflow)
- [ ] Calculator inputs stack in single column
- [ ] Output section appears below inputs
- [ ] "Reset" button is tappable
- [ ] All inputs are accessible and keyboard opens on tap
- [ ] CTA section is readable and buttons are full-width

---

## Calculator 1: Mortgage Payment

- [ ] Enter purchase price + down payment + rate → outputs update live
- [ ] Down payment toggle ($ ↔ %) works correctly
- [ ] Loan amount updates when purchase price or down payment changes
- [ ] 30-year term selected by default
- [ ] Changing loan term updates P&I payment
- [ ] Optional fields (HOA, PMI) show in output only when entered
- [ ] Empty fields show "—" in outputs, not NaN or undefined
- [ ] Reset button clears all fields
- [ ] Formula: verify $300k, 20% down, 7%, 30yr = ~$1,596 P&I

---

## Calculator 2: Cap Rate

- [ ] Enter all 4 inputs → outputs update live
- [ ] Vacancy loss is shown in red (parenthetical deduction)
- [ ] NOI = Effective Gross − Expenses
- [ ] Cap rate color: green ≥6%, yellow 4–6%, red <4%
- [ ] Empty inputs show "—", not NaN
- [ ] Reset works
- [ ] Example: $200k value, $1,800/mo rent, 5% vacancy, $4,000 expenses → ~9.6% cap rate

---

## Calculator 3: Cash-on-Cash Return

- [ ] Enter cash invested + monthly cash flow → outputs update
- [ ] Positive cash flow shows as green
- [ ] Negative cash flow shows as red
- [ ] Return color: green ≥8%, yellow 4–8%, red <4%
- [ ] Reset works
- [ ] Example: $50k invested, $400/mo cash flow → $4,800 annual / 9.6% CoC

---

## Calculator 4: Cash-Out Refi

- [ ] Enter property value + LTV + payoff + closing → outputs update
- [ ] Negative cash-out shows red + warning message
- [ ] Equity remaining is calculated correctly
- [ ] Reset works
- [ ] Example: $300k value, 75% LTV, $120k payoff, $4,500 closing → $225k loan, $100.5k cash out

---

## Calculator 5: Rent vs. Sell

- [ ] Sell section alone (without rent): shows net sale proceeds
- [ ] Rent section alone: shows monthly and annual cash flow
- [ ] Both filled: shows both sides plus 5-year projection
- [ ] Commission shows as red deduction
- [ ] Negative rental cash flow shows in red
- [ ] Reset works
- [ ] Appreciation field optional — 5-year section only shows when filled

---

## Calculator 6: STR Revenue

- [ ] Enter nightly rate → booked nights updates with occupancy
- [ ] Gross revenue = booked nights × nightly + cleaning
- [ ] Platform fees and management fees calculated as % of gross nightly
- [ ] Break-even occupancy shows when calculable
- [ ] Break-even < target occupancy → green (good margin)
- [ ] Break-even > target occupancy → yellow (tight margins)
- [ ] Negative net cash flow shows red
- [ ] Reset works
- [ ] All expense fields optional — only entered ones deducted

---

## Calculator 7: Closing Costs

- [ ] All fee fields optional — only entered ones appear in output
- [ ] Points calculated as % of loan amount
- [ ] Down payment auto-calculated (price − loan) if not manually entered
- [ ] Cash to close = down payment + total closing costs
- [ ] Email template appears with correct purchase price / loan amount filled in
- [ ] "Copy Title Company Email" button copies correct text
- [ ] Copied confirmation appears briefly ("Copied!")
- [ ] Reset works

---

## Error Handling Tests

- [ ] All inputs empty → no NaN, no undefined, no errors in console
- [ ] Enter letters in numeric fields → no crash, treated as 0
- [ ] Enter negative numbers → no crash (some may show odd results, acceptable)
- [ ] Enter very large numbers (billions) → no crash
- [ ] Enter 0 in denominators (e.g., 0% rate, 0 property value) → graceful handling, not divide-by-zero crash

---

## Netlify Deployment Tests

- [ ] `netlify.toml` is present with correct build command and publish directory
- [ ] `npm run build` passes cleanly before deploy
- [ ] Deployed site loads at Netlify URL
- [ ] Logo loads on deployed site (not broken image)
- [ ] All 7 calculators work on deployed site
- [ ] No 404 errors on refresh (redirect rule in netlify.toml handles this)
- [ ] Site works on mobile via Netlify URL

---

## Final Sign-Off

- [ ] No backend code in project
- [ ] No Supabase, no auth, no database
- [ ] No API keys in code
- [ ] No .env files committed
- [ ] GitHub push successful to main branch
- [ ] README.md updated with live Netlify URL
