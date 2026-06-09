import { useState, useMemo } from 'react';
import { fmt$, fmtPct, p, signColor } from '../../utils/format';
import { InputField, OutputRow, OutputSection } from '../CalcShared';

const DEFAULTS = {
  propertyValue: '',
  targetLTV: '75',
  currentPayoff: '',
  closingCosts: '',
};

export function CashOutRefiCalculator() {
  const [v, setV] = useState(DEFAULTS);

  const set = (k: keyof typeof DEFAULTS) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setV(prev => ({ ...prev, [k]: e.target.value }));

  const reset = () => setV(DEFAULTS);

  const out = useMemo(() => {
    const value = p(v.propertyValue);
    const ltv = p(v.targetLTV);
    const payoff = p(v.currentPayoff);
    const closing = p(v.closingCosts);

    // Max new loan = property value × target LTV%
    const maxNewLoan = value * (ltv / 100);
    // Cash-out proceeds = max new loan - current payoff - closing costs
    const cashOut = maxNewLoan - payoff - closing;
    // Equity remaining = property value - max new loan
    const equityRemaining = value - maxNewLoan;
    // Current LTV = payoff / value
    const currentLTV = value > 0 ? (payoff / value) * 100 : 0;

    return { maxNewLoan, cashOut, equityRemaining, currentLTV };
  }, [v]);

  const hasData = p(v.propertyValue) > 0 && p(v.targetLTV) > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
      <div className="lg:col-span-3 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Estimate how much cash you could pull out in a refinance based on your property value and LTV target.
          </p>
          <button onClick={reset} className="btn-reset">Reset</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Estimated Property Value / ARV"
            value={v.propertyValue}
            onChange={set('propertyValue')}
            prefix="$"
            placeholder="300,000"
            help="After-repair value or current market value"
          />
          <InputField
            label="Target LTV"
            value={v.targetLTV}
            onChange={set('targetLTV')}
            suffix="%"
            placeholder="75"
            help="Most lenders allow 70–80% LTV on cash-out refis"
          />
          <InputField
            label="Current Loan Payoff"
            value={v.currentPayoff}
            onChange={set('currentPayoff')}
            prefix="$"
            placeholder="120,000"
            help="Contact your lender for your current payoff amount"
          />
          <InputField
            label="Estimated Refi Closing Costs"
            value={v.closingCosts}
            onChange={set('closingCosts')}
            prefix="$"
            placeholder="4,500"
            help="Origination fees, title, appraisal, etc."
          />
        </div>
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
          <p className="text-xs text-yellow-800 leading-relaxed">
            <strong>Remember:</strong> A cash-out refi replaces your existing loan with a larger one. You'll have a
            new rate and payment. Make sure the new payment fits your cash flow before proceeding.
          </p>
        </div>
      </div>

      <OutputSection
        empty={!hasData}
        emptyMessage="Enter property value, target LTV, current payoff, and closing costs to estimate your cash-out proceeds."
      >
        {hasData && (
          <>
            <OutputRow label="Property Value" value={fmt$(p(v.propertyValue))} />
            <OutputRow label="Target LTV" value={fmtPct(p(v.targetLTV), 0)} />
            <OutputRow label="Max New Loan Amount" value={fmt$(out.maxNewLoan)} />
            <div className="my-2 border-t border-white/10" />
            {p(v.currentPayoff) > 0 && (
              <OutputRow label="Current Loan Payoff" value={`(${fmt$(p(v.currentPayoff))})`} colorClass="text-red-400" />
            )}
            {p(v.closingCosts) > 0 && (
              <OutputRow label="Est. Closing Costs" value={`(${fmt$(p(v.closingCosts))})`} colorClass="text-red-400" />
            )}
            <OutputRow
              label="Est. Cash-Out Proceeds"
              value={fmt$(out.cashOut)}
              colorClass={signColor(out.cashOut)}
              large
              divider
            />
            <OutputRow label="Equity Remaining After Refi" value={fmt$(out.equityRemaining)} />
            {p(v.currentPayoff) > 0 && p(v.propertyValue) > 0 && (
              <OutputRow label="Current LTV (before refi)" value={fmtPct(out.currentLTV, 1)} />
            )}
            {out.cashOut < 0 && (
              <div className="mt-3 p-3 bg-red-900/30 rounded-lg border border-red-700/30">
                <p className="text-xs text-red-300 leading-relaxed">
                  Negative cash-out means your payoff + closing costs exceed the new loan amount at this LTV.
                  Consider a higher LTV target or confirm your payoff balance.
                </p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              Actual proceeds depend on lender approval, appraisal, fees, and final payoff amount. Verify with your lender.
            </p>
          </>
        )}
      </OutputSection>
    </div>
  );
}
