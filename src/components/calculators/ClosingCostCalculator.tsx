import { useState, useMemo } from 'react';
import { fmt$, p } from '../../utils/format';
import { InputField, OutputRow, OutputSection, CopyButton } from '../CalcShared';

const DEFAULTS = {
  purchasePrice: '',
  loanAmount: '',
  downPayment: '',
  lenderOriginationFee: '',
  pointsPct: '',
  titleEscrow: '',
  recordingFees: '',
  prepaidTaxes: '',
  prepaidInsurance: '',
  appraisalMisc: '',
};

export function ClosingCostCalculator() {
  const [v, setV] = useState(DEFAULTS);

  const set = (k: keyof typeof DEFAULTS) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setV(prev => ({ ...prev, [k]: e.target.value }));

  const reset = () => setV(DEFAULTS);

  const out = useMemo(() => {
    const price = p(v.purchasePrice);
    const loan = p(v.loanAmount);
    const dp = p(v.downPayment) || (price > 0 && loan > 0 ? price - loan : 0);

    // Points calculated as % of loan amount
    const pointsAmt = loan > 0 ? loan * (p(v.pointsPct) / 100) : 0;

    const lenderFee = p(v.lenderOriginationFee);
    const title = p(v.titleEscrow);
    const recording = p(v.recordingFees);
    const prepaidTax = p(v.prepaidTaxes);
    const prepaidIns = p(v.prepaidInsurance);
    const appraisal = p(v.appraisalMisc);

    const totalClosing = lenderFee + pointsAmt + title + recording + prepaidTax + prepaidIns + appraisal;
    const cashToClose = dp + totalClosing;

    return { dp, pointsAmt, totalClosing, cashToClose };
  }, [v]);

  const hasData = p(v.purchasePrice) > 0 || p(v.loanAmount) > 0;

  const emailTemplate = useMemo(() => {
    const price = p(v.purchasePrice);
    const loan = p(v.loanAmount);
    return `Subject: Closing Cost Quote Request

Hi [Title Company / Settlement Agent],

I am working on a purchase with the following details:
- Purchase Price: ${price > 0 ? fmt$(price) : '[enter price]'}
- Loan Amount: ${loan > 0 ? fmt$(loan) : '[enter loan amount]'}
- Estimated Close Date: [your target date]

Could you please provide your estimated fees for:
- Title search
- Title insurance (lender's policy + owner's policy)
- Escrow / settlement fee
- Recording fees
- Any other charges you typically see at closing for a purchase this size

Please let me know if you need anything else.

Thank you,
[Your Name]
[Your Phone Number]`;
  }, [v]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
      <div className="lg:col-span-3 p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Add up your estimated closing costs and cash to close. Adjust line items as you get real quotes.
          </p>
          <button onClick={reset} className="btn-reset">Reset</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Purchase Price"
            value={v.purchasePrice}
            onChange={set('purchasePrice')}
            prefix="$"
            placeholder="300,000"
          />
          <InputField
            label="Loan Amount"
            value={v.loanAmount}
            onChange={set('loanAmount')}
            prefix="$"
            placeholder="240,000"
            help="Down payment = Purchase Price − Loan Amount"
          />
          <InputField
            label="Down Payment (if different)"
            value={v.downPayment}
            onChange={set('downPayment')}
            prefix="$"
            placeholder="Auto-calculated"
            help="Leave blank to auto-calculate from price − loan"
          />
          <InputField
            label="Lender / Origination Fee"
            value={v.lenderOriginationFee}
            onChange={set('lenderOriginationFee')}
            prefix="$"
            placeholder="1,500"
            help="Underwriting, processing, admin fees"
          />
          <InputField
            label="Points"
            value={v.pointsPct}
            onChange={set('pointsPct')}
            suffix="% of loan"
            placeholder="0"
            help="1 point = 1% of loan amount"
          />
          <InputField
            label="Title / Escrow Estimate"
            value={v.titleEscrow}
            onChange={set('titleEscrow')}
            prefix="$"
            placeholder="2,000"
            help="Title search, insurance, settlement fee"
          />
          <InputField
            label="Recording Fees"
            value={v.recordingFees}
            onChange={set('recordingFees')}
            prefix="$"
            placeholder="150"
          />
          <InputField
            label="Prepaid Property Taxes"
            value={v.prepaidTaxes}
            onChange={set('prepaidTaxes')}
            prefix="$"
            placeholder="600"
            help="Days of taxes prepaid at closing"
          />
          <InputField
            label="Prepaid Insurance"
            value={v.prepaidInsurance}
            onChange={set('prepaidInsurance')}
            prefix="$"
            placeholder="1,200"
            help="First year homeowners insurance premium"
          />
          <InputField
            label="Appraisal / Inspection / Misc"
            value={v.appraisalMisc}
            onChange={set('appraisalMisc')}
            prefix="$"
            placeholder="700"
            help="Appraisal, home inspection, survey, etc."
          />
        </div>
      </div>

      <OutputSection
        empty={!hasData}
        emptyMessage="Enter purchase price and loan amount, then fill in your fee estimates to see total closing costs."
      >
        {hasData && (
          <>
            {p(v.lenderOriginationFee) > 0 && (
              <OutputRow label="Lender Origination Fee" value={fmt$(p(v.lenderOriginationFee))} />
            )}
            {out.pointsAmt > 0 && (
              <OutputRow label={`Points (${p(v.pointsPct)}%)`} value={fmt$(out.pointsAmt)} />
            )}
            {p(v.titleEscrow) > 0 && (
              <OutputRow label="Title / Escrow" value={fmt$(p(v.titleEscrow))} />
            )}
            {p(v.recordingFees) > 0 && (
              <OutputRow label="Recording Fees" value={fmt$(p(v.recordingFees))} />
            )}
            {p(v.prepaidTaxes) > 0 && (
              <OutputRow label="Prepaid Taxes" value={fmt$(p(v.prepaidTaxes))} />
            )}
            {p(v.prepaidInsurance) > 0 && (
              <OutputRow label="Prepaid Insurance" value={fmt$(p(v.prepaidInsurance))} />
            )}
            {p(v.appraisalMisc) > 0 && (
              <OutputRow label="Appraisal / Misc" value={fmt$(p(v.appraisalMisc))} />
            )}
            <OutputRow
              label="Est. Total Closing Costs"
              value={fmt$(out.totalClosing)}
              colorClass="text-ogr-gold"
              large
              divider
            />
            {out.dp > 0 && (
              <>
                <OutputRow label="Down Payment" value={fmt$(out.dp)} />
                <OutputRow
                  label="Est. Cash to Close"
                  value={fmt$(out.cashToClose)}
                  colorClass="text-ogr-gold"
                  large
                  divider
                />
              </>
            )}

            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-2 font-semibold">
                Get Real Numbers — Copy This Email
              </p>
              <div className="bg-black/20 rounded-lg p-3 text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed max-h-40 overflow-y-auto">
                {emailTemplate}
              </div>
              <CopyButton text={emailTemplate} label="Copy Title Company Email" />
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              These are estimates only. Your actual Closing Disclosure will show final numbers from your lender and title company.
            </p>
          </>
        )}
      </OutputSection>
    </div>
  );
}
