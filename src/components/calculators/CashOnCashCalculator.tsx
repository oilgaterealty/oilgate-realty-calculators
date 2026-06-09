import { useState, useMemo } from 'react';
import { fmt$, fmtPct, p, signColor } from '../../utils/format';
import { InputField, OutputRow, OutputSection } from '../CalcShared';

const DEFAULTS = {
  cashInvested: '',
  monthlyCashFlow: '',
};

export function CashOnCashCalculator() {
  const [v, setV] = useState(DEFAULTS);

  const set = (k: keyof typeof DEFAULTS) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setV(prev => ({ ...prev, [k]: e.target.value }));

  const reset = () => setV(DEFAULTS);

  const out = useMemo(() => {
    const cash = p(v.cashInvested);
    const monthly = p(v.monthlyCashFlow);

    // Annual cash flow = monthly × 12
    const annualCashFlow = monthly * 12;
    // Cash-on-cash return = annual cash flow / cash invested × 100
    const cocReturn = cash > 0 ? (annualCashFlow / cash) * 100 : 0;

    return { annualCashFlow, cocReturn };
  }, [v]);

  const hasData = p(v.cashInvested) > 0 && v.monthlyCashFlow.trim() !== '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
      <div className="lg:col-span-3 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Cash-on-cash return measures your annual cash flow relative to cash actually invested.
          </p>
          <button onClick={reset} className="btn-reset">Reset</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Total Cash Invested"
            value={v.cashInvested}
            onChange={set('cashInvested')}
            prefix="$"
            placeholder="50,000"
            help="Down payment + closing costs + repairs + any other out-of-pocket cash"
          />
          <div>
            <label className="calc-label">Monthly Cash Flow</label>
            <p className="calc-help">After mortgage, taxes, insurance, management, and expenses. Can be negative.</p>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400 text-sm select-none pointer-events-none z-10">$</span>
              <input
                type="text"
                inputMode="decimal"
                value={v.monthlyCashFlow}
                onChange={set('monthlyCashFlow')}
                placeholder="200"
                className="calc-input pl-7"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-ogr-bg rounded-xl border border-gray-100">
          <h4 className="text-sm font-semibold text-ogr-navy mb-2">What counts as cash invested?</h4>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Down payment</li>
            <li>• Closing costs (your portion)</li>
            <li>• Rehab / repair costs</li>
            <li>• Any capital you contributed out of pocket</li>
          </ul>
        </div>
      </div>

      <OutputSection
        empty={!hasData}
        emptyMessage="Enter your total cash invested and expected monthly cash flow to see your CoC return."
      >
        {hasData && (
          <>
            <OutputRow label="Cash Invested" value={fmt$(p(v.cashInvested))} />
            <OutputRow label="Monthly Cash Flow" value={fmt$(p(v.monthlyCashFlow))} colorClass={signColor(p(v.monthlyCashFlow))} />
            <OutputRow label="Annual Cash Flow" value={fmt$(out.annualCashFlow)} colorClass={signColor(out.annualCashFlow)} large divider />
            <OutputRow
              label="Cash-on-Cash Return"
              value={fmtPct(out.cocReturn)}
              colorClass={out.cocReturn >= 8 ? 'text-emerald-400' : out.cocReturn >= 4 ? 'text-yellow-400' : 'text-red-400'}
              large
            />
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong className="text-gray-300">Benchmark:</strong> Many investors target 8–12%+ CoC. Below 4% may not justify the risk vs. other investments, but context matters.
              </p>
            </div>
          </>
        )}
      </OutputSection>
    </div>
  );
}
