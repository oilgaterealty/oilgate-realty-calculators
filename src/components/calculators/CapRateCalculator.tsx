import { useState, useMemo } from 'react';
import { fmt$, fmtPct, p, signColor } from '../../utils/format';
import { InputField, OutputRow, OutputSection } from '../CalcShared';

const DEFAULTS = {
  propertyValue: '',
  monthlyRent: '',
  vacancyPct: '5',
  annualExpenses: '',
};

export function CapRateCalculator() {
  const [v, setV] = useState(DEFAULTS);

  const set = (k: keyof typeof DEFAULTS) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setV(prev => ({ ...prev, [k]: e.target.value }));

  const reset = () => setV(DEFAULTS);

  const out = useMemo(() => {
    const value = p(v.propertyValue);
    const rent = p(v.monthlyRent);
    const vacPct = p(v.vacancyPct);
    const expenses = p(v.annualExpenses);

    // Gross annual income = monthly rent × 12
    const grossAnnual = rent * 12;
    // Vacancy loss = gross × vacancy%
    const vacancyLoss = grossAnnual * (vacPct / 100);
    // Effective gross income = gross - vacancy loss
    const effectiveGross = grossAnnual - vacancyLoss;
    // NOI = effective gross - annual expenses
    const noi = effectiveGross - expenses;
    // Cap rate = NOI / property value × 100
    const capRate = value > 0 ? (noi / value) * 100 : 0;

    return { grossAnnual, vacancyLoss, effectiveGross, noi, capRate };
  }, [v]);

  const hasData = p(v.propertyValue) > 0 && p(v.monthlyRent) > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
      <div className="lg:col-span-3 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Cap rate measures a property's income potential relative to its value.
          </p>
          <button onClick={reset} className="btn-reset">Reset</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Property Value / Purchase Price"
            value={v.propertyValue}
            onChange={set('propertyValue')}
            prefix="$"
            placeholder="200,000"
          />
          <InputField
            label="Monthly Rent (gross)"
            value={v.monthlyRent}
            onChange={set('monthlyRent')}
            prefix="$"
            placeholder="1,800"
            help="Full monthly rent before any deductions"
          />
          <InputField
            label="Vacancy Rate"
            value={v.vacancyPct}
            onChange={set('vacancyPct')}
            suffix="%"
            placeholder="5"
            help="Typical range: 5–10% for long-term rentals"
          />
          <InputField
            label="Annual Operating Expenses"
            value={v.annualExpenses}
            onChange={set('annualExpenses')}
            prefix="$"
            placeholder="4,000"
            help="Taxes, insurance, repairs, management, utilities (not mortgage)"
          />
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Note:</strong> Expenses should include taxes, insurance, repairs, management fees, and any
            utilities you pay — but NOT your mortgage payment. Debt service is excluded from NOI.
          </p>
        </div>
      </div>

      <OutputSection
        empty={!hasData}
        emptyMessage="Enter property value, monthly rent, and expenses to calculate cap rate."
      >
        {hasData && (
          <>
            <OutputRow label="Gross Annual Income" value={fmt$(out.grossAnnual)} />
            <OutputRow label="Vacancy Loss" value={`(${fmt$(out.vacancyLoss)})`} colorClass="text-red-400" />
            <OutputRow label="Effective Gross Income" value={fmt$(out.effectiveGross)} />
            <OutputRow label="Annual Expenses" value={`(${fmt$(p(v.annualExpenses))})`} colorClass="text-red-400" />
            <OutputRow
              label="Net Operating Income (NOI)"
              value={fmt$(out.noi)}
              colorClass={signColor(out.noi)}
              large
              divider
            />
            <OutputRow
              label="Cap Rate"
              value={fmtPct(out.capRate)}
              colorClass={out.capRate >= 6 ? 'text-emerald-400' : out.capRate >= 4 ? 'text-yellow-400' : 'text-red-400'}
              large
            />
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400 leading-relaxed">
                <strong className="text-gray-300">Benchmark:</strong> 6–10% is commonly considered a good cap rate for investment properties, though this varies widely by market.
              </p>
            </div>
          </>
        )}
      </OutputSection>
    </div>
  );
}
