import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowToUse } from './components/HowToUse';
import { Disclaimer } from './components/Disclaimer';
import { CTASection } from './components/CTASection';
import { MortgageCalculator } from './components/calculators/MortgageCalculator';
import { CapRateCalculator } from './components/calculators/CapRateCalculator';
import { CashOnCashCalculator } from './components/calculators/CashOnCashCalculator';
import { CashOutRefiCalculator } from './components/calculators/CashOutRefiCalculator';
import { RentVsSellCalculator } from './components/calculators/RentVsSellCalculator';
import { STRRevenueCalculator } from './components/calculators/STRRevenueCalculator';
import { ClosingCostCalculator } from './components/calculators/ClosingCostCalculator';

type TabId =
  | 'mortgage'
  | 'cap-rate'
  | 'coc'
  | 'refi'
  | 'rent-vs-sell'
  | 'str'
  | 'closing';

interface Tab {
  id: TabId;
  label: string;
  shortLabel: string;
  title: string;
  description: string;
}

const TABS: Tab[] = [
  {
    id: 'mortgage',
    label: 'Mortgage Payment',
    shortLabel: 'Mortgage',
    title: 'Mortgage Payment Calculator',
    description:
      'Estimate your monthly payment including principal & interest, property taxes, insurance, HOA, and PMI.',
  },
  {
    id: 'cap-rate',
    label: 'Cap Rate',
    shortLabel: 'Cap Rate',
    title: 'Cap Rate Calculator',
    description:
      'Calculate net operating income (NOI) and capitalization rate to evaluate a rental property\'s income potential.',
  },
  {
    id: 'coc',
    label: 'Cash-on-Cash Return',
    shortLabel: 'CoC Return',
    title: 'Cash-on-Cash Return Calculator',
    description:
      'Measure your annual cash flow relative to the total cash you invested — a key metric for rental investors.',
  },
  {
    id: 'refi',
    label: 'Cash-Out Refi',
    shortLabel: 'Cash-Out Refi',
    title: 'Cash-Out Refinance Estimator',
    description:
      'Estimate how much cash you could pull out of a property based on your target LTV and current payoff.',
  },
  {
    id: 'rent-vs-sell',
    label: 'Rent vs. Sell',
    shortLabel: 'Rent vs. Sell',
    title: 'Rent vs. Sell Calculator',
    description:
      'Compare your estimated net proceeds from selling vs. ongoing cash flow and equity build from keeping and renting.',
  },
  {
    id: 'str',
    label: 'STR Revenue',
    shortLabel: 'STR Revenue',
    title: 'Short-Term Rental Revenue Estimator',
    description:
      'Estimate monthly and annual STR cash flow based on your nightly rate, occupancy, and manual expense inputs. No market data used.',
  },
  {
    id: 'closing',
    label: 'Closing Costs',
    shortLabel: 'Closing Costs',
    title: 'Closing Cost Estimator',
    description:
      'Add up estimated closing costs line by line, calculate your cash to close, and generate a title company email to request real quotes.',
  },
];

function CalcCard({ tab, children }: { tab: Tab; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-ogr-navy px-6 py-5">
        <h2 className="text-xl font-bold text-white">{tab.title}</h2>
        <p className="text-sm text-gray-300 mt-1 leading-relaxed">{tab.description}</p>
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('mortgage');

  const currentTab = TABS.find(t => t.id === activeTab)!;

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    // Scroll to calculators section
    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />

      {/* Calculator Section */}
      <section id="calculators" className="py-10 px-4 flex-1">
        <div className="max-w-6xl mx-auto">

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-start">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'bg-ogr-navy text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Calculator */}
          <CalcCard tab={currentTab}>
            {activeTab === 'mortgage' && <MortgageCalculator />}
            {activeTab === 'cap-rate' && <CapRateCalculator />}
            {activeTab === 'coc' && <CashOnCashCalculator />}
            {activeTab === 'refi' && <CashOutRefiCalculator />}
            {activeTab === 'rent-vs-sell' && <RentVsSellCalculator />}
            {activeTab === 'str' && <STRRevenueCalculator />}
            {activeTab === 'closing' && <ClosingCostCalculator />}
          </CalcCard>

          {/* Quick-access grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`p-3 rounded-xl border text-xs font-semibold transition-colors text-center
                  ${activeTab === tab.id
                    ? 'border-ogr-navy bg-ogr-navy/5 text-ogr-navy'
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:text-gray-700'
                  }`}
              >
                {tab.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </section>

      <HowToUse />
      <Disclaimer />
      <CTASection />
    </div>
  );
}
