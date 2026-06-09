import { useState, useMemo } from 'react';
import { fmt$, fmtPct, p } from '../../utils/format';
import { InputField, OutputRow, OutputSection } from '../CalcShared';

type Mode = '$' | '%';

const DEFAULTS = {
  purchasePrice: '',
  downPayment: '',
  downPaymentMode: '$' as Mode,
  interestRate: '',
  loanTerm: '30',
  propertyTax: '',
  insurance: '',
  hoa: '',
  pmi: '',
};

export function MortgageCalculator() {
  const [v, setV] = useState(DEFAULTS);

  const set = (k: keyof typeof DEFAULTS) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setV(prev => ({ ...prev, [k]: e.target.value }));

  const toggleMode = () =>
    setV(prev => ({ ...prev, downPaymentMode: prev.downPaymentMode === '$' ? '%' : '$', downPayment: '' }));

  const reset = () => setV(DEFAULTS);

  const out = useMemo(() => {
    const price = p(v.purchasePrice);
    const dpRaw = p(v.downPayment);
    const dp = v.downPaymentMode === '%' ? price * (dpRaw / 100) : dpRaw;
    const loan = Math.max(0, price - dp);
    const rate = p(v.interestRate);
    const term = parseInt(v.loanTerm) || 30;
    const r = rate / 100 / 12;
    const n = term * 12;

    // Standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    let pi = 0;
    if (loan > 0 && n > 0) {
      if (r === 0) {
        pi = loan / n;
      } else {
        const factor = Math.pow(1 + r, n);
        pi = loan * (r * factor) / (factor - 1);
      }
    }

    const dpPct = price > 0 ? (dp / price) * 100 : 0;
    const tax = p(v.propertyTax) / 12;
    const ins = p(v.insurance) / 12;
    const hoa = p(v.hoa);
    const pmi = p(v.pmi);
    const total = pi + tax + ins + hoa + pmi;

    return { loan, dp, dpPct, pi, tax, ins, hoa, pmi, total };
  }, [v]);

  const hasData = out.loan > 0 && p(v.interestRate) > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
      <div className="lg:col-span-3 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">Estimate your monthly mortgage payment including taxes, insurance, and fees.</p>
          <button onClick={reset} className="btn-reset">Reset</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Purchase Price"
            value={v.purchasePrice}
            onChange={set('purchasePrice') as React.ChangeEventHandler<HTMLInputElement>}
            prefix="$"
            placeholder="350,000"
          />
          <div>
            <label className="calc-label">Down Payment</label>
            <div className="flex gap-2">
              <div className="relative flex items-center flex-1">
                {v.downPaymentMode === '$' && (
                  <span className="absolute left-3 text-gray-400 text-sm select-none pointer-events-none z-10">$</span>
                )}
                <input
                  type="text"
                  inputMode="decimal"
                  value={v.downPayment}
                  onChange={set('downPayment') as React.ChangeEventHandler<HTMLInputElement>}
                  placeholder={v.downPaymentMode === '$' ? '70,000' : '20'}
                  className={`calc-input ${v.downPaymentMode === '$' ? 'pl-7' : ''} ${v.downPaymentMode === '%' ? 'pr-7' : ''}`}
                />
                {v.downPaymentMode === '%' && (
                  <span className="absolute right-3 text-gray-400 text-sm select-none pointer-events-none">%</span>
                )}
              </div>
              <button
                onClick={toggleMode}
                title="Toggle between dollar and percent"
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-ogr-navy hover:bg-gray-50 transition-colors"
              >
                {v.downPaymentMode}
              </button>
            </div>
          </div>
          <InputField
            label="Interest Rate"
            value={v.interestRate}
            onChange={set('interestRate') as React.ChangeEventHandler<HTMLInputElement>}
            suffix="%"
            placeholder="7.25"
          />
          <div>
            <label className="calc-label">Loan Term</label>
            <select value={v.loanTerm} onChange={set('loanTerm') as React.ChangeEventHandler<HTMLSelectElement>} className="calc-input">
              <option value="10">10 years</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="25">25 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
          <InputField
            label="Annual Property Taxes"
            value={v.propertyTax}
            onChange={set('propertyTax') as React.ChangeEventHandler<HTMLInputElement>}
            prefix="$"
            placeholder="3,600"
            help="Full-year amount (divided by 12 for monthly)"
          />
          <InputField
            label="Annual Insurance"
            value={v.insurance}
            onChange={set('insurance') as React.ChangeEventHandler<HTMLInputElement>}
            prefix="$"
            placeholder="1,200"
            help="Full-year amount (divided by 12 for monthly)"
          />
          <InputField
            label="Monthly HOA"
            value={v.hoa}
            onChange={set('hoa') as React.ChangeEventHandler<HTMLInputElement>}
            prefix="$"
            placeholder="0"
          />
          <InputField
            label="Monthly PMI (optional)"
            value={v.pmi}
            onChange={set('pmi') as React.ChangeEventHandler<HTMLInputElement>}
            prefix="$"
            placeholder="0"
            help="Typically required if down payment < 20%"
          />
        </div>
      </div>

      <OutputSection
        empty={!hasData}
        emptyMessage="Enter purchase price, down payment, and interest rate to see your estimated monthly payment."
      >
        {hasData && (
          <>
            <OutputRow label="Loan Amount" value={fmt$(out.loan)} />
            <OutputRow label="Down Payment" value={`${fmt$(out.dp)} (${fmtPct(out.dpPct, 1)})`} />
            <div className="my-2 border-t border-white/10" />
            <OutputRow label="Principal & Interest" value={fmt$(out.pi)} />
            {out.tax > 0 && <OutputRow label="Est. Monthly Tax" value={fmt$(out.tax)} />}
            {out.ins > 0 && <OutputRow label="Est. Monthly Insurance" value={fmt$(out.ins)} />}
            {out.hoa > 0 && <OutputRow label="Monthly HOA" value={fmt$(out.hoa)} />}
            {out.pmi > 0 && <OutputRow label="Monthly PMI" value={fmt$(out.pmi)} />}
            <OutputRow
              label="Est. Total Monthly Payment"
              value={fmt$(out.total)}
              colorClass="text-ogr-gold"
              large
              divider
            />
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              P&amp;I uses standard amortization. Taxes and insurance are estimates. Actual payment may differ.
            </p>
          </>
        )}
      </OutputSection>
    </div>
  );
}
