import { useState, useMemo } from 'react';
import { fmt$, fmtPct, fmtNum, p, signColor } from '../../utils/format';
import { InputField, OutputRow, OutputSection } from '../CalcShared';

const DEFAULTS = {
  avgNightlyRate: '',
  occupancyPct: '65',
  monthlyCleaningRevenue: '',
  monthlyMortgage: '',
  utilities: '',
  supplies: '',
  platformFeePct: '3',
  managementPct: '0',
  maintenanceReserve: '',
  otherExpenses: '',
};

export function STRRevenueCalculator() {
  const [v, setV] = useState(DEFAULTS);

  const set = (k: keyof typeof DEFAULTS) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setV(prev => ({ ...prev, [k]: e.target.value }));

  const reset = () => setV(DEFAULTS);

  const out = useMemo(() => {
    const nightly = p(v.avgNightlyRate);
    const occ = p(v.occupancyPct);
    const cleaning = p(v.monthlyCleaningRevenue);
    const mortgage = p(v.monthlyMortgage);
    const utilities = p(v.utilities);
    const supplies = p(v.supplies);
    const platformPct = p(v.platformFeePct);
    const mgmtPct = p(v.managementPct);
    const maintenance = p(v.maintenanceReserve);
    const other = p(v.otherExpenses);

    // Booked nights per month = 30 × occupancy%
    const bookedNights = 30 * (occ / 100);
    // Gross nightly revenue
    const grossNightly = bookedNights * nightly;
    // Total gross revenue including cleaning fees
    const grossRevenue = grossNightly + cleaning;
    // Platform fees applied to nightly revenue only (not cleaning pass-through)
    const platformFees = grossNightly * (platformPct / 100);
    // Management fees applied to gross nightly revenue
    const mgmtFees = grossNightly * (mgmtPct / 100);
    // Total fixed monthly expenses
    const fixedExpenses = mortgage + utilities + supplies + maintenance + other;
    // Total monthly expenses
    const totalExpenses = platformFees + mgmtFees + fixedExpenses;
    // Net monthly cash flow
    const netMonthly = grossRevenue - totalExpenses;
    // Net annual cash flow
    const netAnnual = netMonthly * 12;

    // Break-even occupancy: find occ% where net = 0
    // grossNightly_be × (1 - platform% - mgmt%) + cleaning = fixedExpenses
    // (occ_be/100 × 30 × nightly) × (1 - platform% - mgmt%) = fixedExpenses - cleaning
    const variableFactor = 1 - (platformPct + mgmtPct) / 100;
    const fixedNet = fixedExpenses - cleaning;
    let breakEvenOcc = 0;
    if (nightly > 0 && variableFactor > 0) {
      const bookedNights_be = fixedNet / (nightly * variableFactor);
      breakEvenOcc = (bookedNights_be / 30) * 100;
    }

    return {
      bookedNights,
      grossRevenue,
      platformFees,
      mgmtFees,
      fixedExpenses,
      totalExpenses,
      netMonthly,
      netAnnual,
      breakEvenOcc,
    };
  }, [v]);

  const hasData = p(v.avgNightlyRate) > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
      <div className="lg:col-span-3 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Estimate STR revenue and net cash flow based on your manual inputs. No market data is used.
          </p>
          <button onClick={reset} className="btn-reset">Reset</button>
        </div>

        <div>
          <h3 className="text-xs font-bold text-ogr-navy uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">Revenue</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Average Nightly Rate"
              value={v.avgNightlyRate}
              onChange={set('avgNightlyRate')}
              prefix="$"
              placeholder="150"
              help="Your target average rate per booked night"
            />
            <InputField
              label="Occupancy Rate"
              value={v.occupancyPct}
              onChange={set('occupancyPct')}
              suffix="%"
              placeholder="65"
              help="% of nights booked per month — your estimate"
            />
            <InputField
              label="Monthly Cleaning Revenue (collected)"
              value={v.monthlyCleaningRevenue}
              onChange={set('monthlyCleaningRevenue')}
              prefix="$"
              placeholder="400"
              help="Total cleaning fees collected from guests monthly"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-ogr-navy uppercase tracking-wider mb-3 border-b border-gray-100 pb-1">Monthly Expenses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Platform Fees"
              value={v.platformFeePct}
              onChange={set('platformFeePct')}
              suffix="%"
              placeholder="3"
              help="Airbnb host fee ~3%, VRBO ~5%"
            />
            <InputField
              label="Property Management"
              value={v.managementPct}
              onChange={set('managementPct')}
              suffix="%"
              placeholder="0"
              help="If using a co-host or manager (10–20% typical)"
            />
            <InputField
              label="Mortgage / Payment"
              value={v.monthlyMortgage}
              onChange={set('monthlyMortgage')}
              prefix="$"
              placeholder="1,200"
            />
            <InputField
              label="Utilities"
              value={v.utilities}
              onChange={set('utilities')}
              prefix="$"
              placeholder="300"
              help="Electric, gas, water, internet, streaming"
            />
            <InputField
              label="Supplies / Restocking"
              value={v.supplies}
              onChange={set('supplies')}
              prefix="$"
              placeholder="100"
              help="Toiletries, paper goods, kitchen supplies"
            />
            <InputField
              label="Maintenance Reserve"
              value={v.maintenanceReserve}
              onChange={set('maintenanceReserve')}
              prefix="$"
              placeholder="150"
            />
            <InputField
              label="Other Monthly Expenses"
              value={v.otherExpenses}
              onChange={set('otherExpenses')}
              prefix="$"
              placeholder="0"
              help="HOA, taxes, insurance, etc."
            />
          </div>
        </div>
      </div>

      <OutputSection empty={!hasData} emptyMessage="Enter your average nightly rate to start estimating STR revenue.">
        {hasData && (
          <>
            <OutputRow label={`Estimated Booked Nights (${p(v.occupancyPct).toFixed(0)}% occ.)`} value={`${fmtNum(out.bookedNights)} nights`} />
            <OutputRow label="Monthly Gross Revenue" value={fmt$(out.grossRevenue)} />
            <div className="my-2 border-t border-white/10" />
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 mt-1">Expenses</p>
            {out.platformFees > 0 && <OutputRow label="Platform Fees" value={`(${fmt$(out.platformFees)})`} colorClass="text-red-400" />}
            {out.mgmtFees > 0 && <OutputRow label="Management Fees" value={`(${fmt$(out.mgmtFees)})`} colorClass="text-red-400" />}
            {out.fixedExpenses > 0 && <OutputRow label="Fixed Monthly Expenses" value={`(${fmt$(out.fixedExpenses)})`} colorClass="text-red-400" />}
            <OutputRow label="Total Monthly Expenses" value={`(${fmt$(out.totalExpenses)})`} colorClass="text-red-400" />
            <OutputRow
              label="Est. Monthly Net Cash Flow"
              value={fmt$(out.netMonthly)}
              colorClass={signColor(out.netMonthly)}
              large
              divider
            />
            <OutputRow
              label="Est. Annual Net Cash Flow"
              value={fmt$(out.netAnnual)}
              colorClass={signColor(out.netAnnual)}
            />
            {out.breakEvenOcc > 0 && out.breakEvenOcc <= 100 && (
              <OutputRow
                label="Break-Even Occupancy"
                value={fmtPct(out.breakEvenOcc, 1)}
                colorClass={out.breakEvenOcc < p(v.occupancyPct) ? 'text-emerald-400' : 'text-yellow-400'}
              />
            )}
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              All inputs are manual estimates only. No live market data is used. Actual results depend on your market, listing quality, and operations.
            </p>
          </>
        )}
      </OutputSection>
    </div>
  );
}
