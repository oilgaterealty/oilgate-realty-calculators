# Calculator Formulas & Assumptions

All formulas are implemented in `src/components/calculators/*.tsx`.
All results are estimates only — not financial advice.

---

## 1. Mortgage Payment Calculator

**Principal & Interest (Monthly P&I):**
```
M = P × [r(1+r)^n] / [(1+r)^n - 1]

Where:
  P = Loan amount (purchase price − down payment)
  r = Monthly interest rate = (annual rate ÷ 100) ÷ 12
  n = Total number of payments = loan term in years × 12

Special case: if r = 0, then M = P / n
```

**Monthly Components:**
```
Monthly Tax     = Annual Property Tax ÷ 12
Monthly Ins     = Annual Insurance ÷ 12
Total Monthly   = P&I + Monthly Tax + Monthly Ins + HOA + PMI
```

**Assumptions:**
- Does not include mortgage insurance premium (MIP) for FHA loans unless entered in PMI field
- Taxes and insurance are estimates; actual escrow amounts set by lender
- Does not account for tax deductibility of mortgage interest

---

## 2. Cap Rate Calculator

```
Gross Annual Income     = Monthly Rent × 12
Vacancy Loss            = Gross Annual Income × (Vacancy % ÷ 100)
Effective Gross Income  = Gross Annual Income − Vacancy Loss
NOI                     = Effective Gross Income − Annual Operating Expenses
Cap Rate                = NOI ÷ Property Value × 100
```

**Assumptions:**
- Operating expenses should include taxes, insurance, repairs, management, utilities — but NOT mortgage debt service
- Cap rate is an unlevered metric (ignores financing)
- Benchmark: 6–10% is often cited as a reasonable range, but varies significantly by market and property type

---

## 3. Cash-on-Cash Return Calculator

```
Annual Cash Flow      = Monthly Cash Flow × 12
Cash-on-Cash Return   = Annual Cash Flow ÷ Cash Invested × 100
```

**What "cash invested" includes:**
- Down payment
- Closing costs (buyer's portion)
- Rehab / renovation costs
- Any other out-of-pocket capital deployed

**Assumptions:**
- Monthly cash flow is after all expenses including mortgage, taxes, insurance, management, and repairs reserve
- Does not account for tax benefits, principal paydown, or appreciation
- CoC is a before-tax metric

---

## 4. Cash-Out Refinance Estimator

```
Max New Loan          = Property Value × (Target LTV ÷ 100)
Cash-Out Proceeds     = Max New Loan − Current Loan Payoff − Closing Costs
Equity Remaining      = Property Value − Max New Loan
Current LTV           = Current Loan Payoff ÷ Property Value × 100
```

**Assumptions:**
- Uses after-repair value (ARV) or current market value as the basis
- Actual LTV limits vary by lender (typically 70–80% for investment properties, up to 80% for primary)
- Does not factor in DTI, credit score requirements, or lender-specific overlays
- Closing costs should include origination, title, appraisal, and recording fees

---

## 5. Rent vs. Sell Calculator

**Sell scenario:**
```
Commission Amount     = Sale Price × (Agent Commission % ÷ 100)
Net Sale Proceeds     = Sale Price − Loan Payoff − Commission − Seller Closing − Repairs
```

**Rent scenario:**
```
Effective Rent        = Monthly Rent × (1 − Vacancy % ÷ 100)
Management Fee        = Effective Rent × (Management % ÷ 100)
Monthly Cash Flow     = Effective Rent − Monthly Mortgage − Monthly Expenses − Management Fee
Annual Cash Flow      = Monthly Cash Flow × 12
```

**5-Year Projection (simplified):**
```
5-Year Property Value = Sale Price × (1 + Appreciation % ÷ 100)^5
Appreciation Gain     = 5-Year Property Value − Sale Price
5-Year Rent Total     = (Annual Cash Flow × 5) + Appreciation Gain
```

**Assumptions:**
- Appreciation is compound annual, not guaranteed
- Does not factor in principal paydown, capital improvements, taxes on sale, or depreciation
- Management fee is applied to effective (vacancy-adjusted) rent

---

## 6. STR Revenue Estimator

```
Booked Nights/Month   = 30 × (Occupancy % ÷ 100)
Gross Nightly Revenue = Booked Nights × Average Nightly Rate
Total Gross Revenue   = Gross Nightly Revenue + Monthly Cleaning Revenue

Platform Fees         = Gross Nightly Revenue × (Platform Fee % ÷ 100)
Management Fees       = Gross Nightly Revenue × (Management % ÷ 100)
Fixed Expenses        = Mortgage + Utilities + Supplies + Maintenance + Other
Total Monthly Expenses = Platform Fees + Management Fees + Fixed Expenses

Net Monthly Cash Flow = Total Gross Revenue − Total Monthly Expenses
Net Annual Cash Flow  = Net Monthly Cash Flow × 12

Break-Even Occupancy:
  Let F = Fixed Expenses − Cleaning Revenue
  Let V = (1 − Platform% − Management%) (as decimals)
  Booked Nights (break-even) = F ÷ (Nightly Rate × V)
  Break-Even Occupancy % = (Booked Nights ÷ 30) × 100
```

**Assumptions:**
- All inputs are manual estimates — no live market data is used
- Cleaning revenue is entered as a monthly total (not per-booking)
- Platform fees applied to nightly revenue only (not cleaning pass-through)
- Month assumed to be 30 nights for simplicity

---

## 7. Closing Cost Estimator

```
Points Amount         = Loan Amount × (Points % ÷ 100)
Total Closing Costs   = Origination Fee + Points Amount + Title/Escrow + Recording
                        + Prepaid Taxes + Prepaid Insurance + Appraisal/Misc

Down Payment          = Purchase Price − Loan Amount (if not manually entered)
Cash to Close         = Down Payment + Total Closing Costs
```

**Assumptions:**
- All fee fields are optional; only entered amounts are summed
- Does not include seller-paid concessions or lender credits
- Prepaid taxes and insurance are out-of-pocket at closing (not ongoing monthly amounts)
- Points are calculated as % of loan amount (1 point = 1% of loan)
- Final Closing Disclosure from lender will show actual itemized costs

---

## General Disclaimer

All formulas use standard real estate and financial calculations. Results are estimates for
informational purposes only. Actual figures depend on lender terms, market conditions, property
characteristics, and other factors. Always verify with licensed professionals before making
financial decisions.
