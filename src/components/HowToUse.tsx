const steps = [
  {
    num: '1',
    title: 'Pick a Calculator',
    body: 'Select the calculator that fits your situation from the tabs above. Each tool is built for a specific real estate scenario.',
  },
  {
    num: '2',
    title: 'Enter Your Numbers',
    body: 'Fill in the input fields with your actual or estimated figures. Results update live as you type — no need to click Calculate.',
  },
  {
    num: '3',
    title: 'Review the Estimates',
    body: 'The output panel shows your estimated results. Use them to quickly evaluate a deal, compare scenarios, or prepare for a conversation with your lender or agent.',
  },
  {
    num: '4',
    title: 'Verify with Professionals',
    body: 'These are estimates only. Always confirm final numbers with your lender, title company, accountant, or real estate agent before making decisions.',
  },
];

export function HowToUse() {
  return (
    <section id="how-to-use" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-ogr-navy">
            How to Use These Calculators
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-xl mx-auto">
            These tools are designed to be fast and frictionless. No login. No subscription. No data saved.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-start gap-3 p-5 bg-ogr-bg rounded-xl border border-gray-100">
              <div className="w-9 h-9 rounded-full bg-ogr-navy flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {step.num}
              </div>
              <div>
                <h3 className="font-semibold text-ogr-navy text-sm">{step.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
