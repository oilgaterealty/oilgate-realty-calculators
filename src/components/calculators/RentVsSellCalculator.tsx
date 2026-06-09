import { useState, useMemo } from 'react';
import { fmt$, fmtPct, p, signColor } from '../../utils/format';
import { InputField, OutputRow, OutputSection } from '../CalcShared';

const DEFAULTS = {
  salePrice: '',
  loanPayoff: '',
  agentCommission: '6',
  sellerClosing: '',
  repairs: '',
  monthlyRent: '',
  vacancyPct: '5',
  monthlyMortgage: '',
  monthlyExpenses: '',
  managementPct: '8',
  annualAppreciation: '3',
};

export function RentVsSellCalculator() {
  const [v, setV] = useState(DEFAULTS);

  const set = (k: keyof typeof DEFAULTS) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setV(prev => ({ ...prev, [k]: e.target.value }));

  const reset = () => setV(DEFAULTS);

  const out = useMemo(() => {
    const salePrice = p(v.salePrice);
    const payoff = p(v.loanPayoff);
    const commission = p(v.agentCommission);
    const sellerClosing = p(v.sellerClosing);
    const repairs = p(v.repairs);

    const rent = p(v.monthlyRent);
    const vacPct = p(v.vacancyPct);
    const mortgage = p(v.monthlyMortgage);
    const expenses = p(v.monthlyExpenses);
    const mgmtPct = p(v.managementPct);
    const appreciation = p(v.annualAppreciation);

    // Sell scenario
    const commissionAmt = salePrice * (commission / 100);
    const netSaleProceeds = salePrice - payoff - commissionAmt - sellerClosing - repairs;

    // Rent scenario
    const effectiveRent = rent * (1 - vacPct / 100);
    const mgmtFee = effectiveRent * (mgmtPct / 100);
    const monthlyRentalCashFlow = effectiveRent - mortgage - expenses - mgmtFee;
    const annualRentalCashFlow = monthlyRentalCashFlow * 12;

    // 5-year equity build (appreciation only, simplified)
    const fiveYearValue = salePrice * Math.pow(1 + appreciation / 100, 5);
    const fiveYearAppreciationGain = fiveYearValue - salePrice;
    const fiveYearRentalCashFlow = annualRentalCashFlow * 5;
    const fiveYearRentTotal = fiveYearRentalCashFlow + fiveYearAppreciationGain;

    return {
      commissionAmt,
      netSaleProceeds,
      effectiveRent,
      mgmtFee,
      monthlyRentalCashFlow,
      annualRentalCashFlow,
      fiveYearRentTotal,
      fiveYearAppreciationGain,
    };
  }, [v]);

  const hasSellData = p(v.salePrice) > 0;
  const hasRentData = p(v.monthlyRent) > 0;
  const hasData = hasSellData || hasRentData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
      <div className="lg:col-span-3 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Compare your estimated net proceeds from a sale vs. ongoing rental cash flow.
          </p>
          <button onClick={reset} className="btn-reset">Reset</button>
        </div>

        {/* Sell Side */}
        <div>
          <h3 className="text-xs font-bold text-ogr-navy uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">
            If You Sell
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Expected Sale Price"
              value={v.salePrice}
              onChange={set('salePrice')}
              prefix="$"
              placeholder="250,000"
            />
            <InputField
              label="Loan Payoff"
              value={v.loanPayoff}
              onChange={set('loanPayoff')}
              prefix="$"
              placeholder="130,000"
            />
            <InputField
              label="Agent Commission"
              value={v.agentCommission}
              onChange={set('agentCommission')}
              suffix="%"
              placeholder="6"
            />
            <InputField
              label="Seller Closing Costs"
              value={v.sellerClosing}
              onChange={set('sellerClosing')}
              prefix="$"
              placeholder="2,000"
              help="Transfer taxes, attorney fees, etc."
            />
            <InputField
              label="Repairs / Prep Costs"
              value={v.repairs}
              onChange={set('repairs')}
              prefix="$"
              placeholder="0"
            />
          </div>
        </div>

        {/* Rent Side */}
        <div>
          <h3 className="text-xs font-bold text-ogr-navy uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">
            If You Rent
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Monthly Rent"
              value={v.monthlyRent}
              onChange={set('monthlyRent')}
              prefix="$"
              placeholder="1,600"
            />
            <InputField
              label="Vacancy Rate"
              value={v.vacancyPct}
              onChange={set('vacancyPct')}
              suffix="%"
              placeholder="5"
            />
            <InputField
              label="Monthly Mortgage / Payment"
              value={v.monthlyMortgage}
              onChange={set('monthlyMortgage')}
              prefix="$"
              placeholder="1,100"
              help="Full PITI if escrowed"
            />
            <InputField
              label="Monthly Expenses"
              value={v.monthlyExpenses}
              onChange={set('monthlyExpenses')}
              prefix="$"
              placeholder="200"
              help="Repairs reserve, lawn, misc"
            />
            <InputField
              label="Property Management"
              value={v.managementPct}
              onChange={set('managementPct')}
              suffix="%"
              placeholder="8"
              help="% of collected rent — enter 0 if self-managing"
            />
            <InputField
              label="Annual Appreciation (optional)"
              value={v.annualAppreciation}
              onChange={set('annualAppreciation')}
              suffix="%"
              placeholder="3"
              help="Used for 5-year projection only"
            />
          </div>
        </div>
      </div>

      <OutputSection empty={!hasData} emptyMessage="Enter sale price or rental details to compare scenarios.">
        {hasData && (
          <>
            {hasSellData && (
              <>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">If You Sell</p>
                <OutputRow label="Sale Price" value={fmt$(p(v.salePrice))} />
                {p(v.loanPayoff) > 0 && <OutputRow label="Loan Payoff" value={`(${fmt$(p(v.loanPayoff))})`} colorClass="text-red-400" />}
                {out.commissionAmt > 0 && <OutputRow label="Agent Commission" value={`(${fmt$(out.commissionAmt)})`} colorClass="text-red-400" />}
                {p(v.sellerClosing) > 0 && <OutputRow label="Seller Closing" value={`(${fmt$(p(v.sellerClosing))})`} colorClass="text-red-400" />}
                {p(v.repairs) > 0 && <OutputRow label="Repairs / Prep" value={`(${fmt$(p(v.repairs))})`} colorClass="text-red-400" />}
                <OutputRow
                  label="Est. Net Sale Proceeds"
                  value={fmt$(out.netSaleProceeds)}
                  colorClass={signColor(out.netSaleProceeds)}
                  large
                  divider
                />
              </>
            )}

            {hasRentData && (
              <>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-2">If You Rent</p>
                <OutputRow label="Effective Rent (after vacancy)" value={fmt$(out.effectiveRent)} />
                {out.mgmtFee > 0 && <OutputRow label="Management Fee" value={`(${fmt$(out.mgmtFee)})`} colorClass="text-red-400" />}
                <OutputRow
                  label="Monthly Rental Cash Flow"
                  value={fmt$(out.monthlyRentalCashFlow)}
                  colorClass={signColor(out.monthlyRentalCashFlow)}
                  large
                  divider
                />
                <OutputRow
                  label="Annual Rental Cash Flow"
                  value={fmt$(out.annualRentalCashFlow)}
                  colorClass={signColor(out.annualRentalCashFlow)}
                />
              </>
            )}

            {hasSellData && hasRentData && p(v.annualAppreciation) > 0 && (
              <>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-2">5-Year Projection (Rent)</p>
                <OutputRow label="5-Yr Cash Flow" value={fmt$(out.annualRentalCashFlow * 5)} colorClass={signColor(out.annualRentalCashFlow)} />
                <OutputRow label="Est. Appreciation Gain" value={fmt$(out.fiveYearAppreciationGain)} colorClass="text-emerald-400" />
                <OutputRow
                  label="5-Yr Rent Total Benefit"
                  value={fmt$(out.fiveYearRentTotal)}
                  colorClass={signColor(out.fiveYearRentTotal)}
                />
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  Appreciation projection is simplified and not guaranteed. Does not account for principal paydown, taxes on gains, or market changes.
                </p>
              </>
            )}
          </>
        )}
      </OutputSection>
    </div>
  );
}
