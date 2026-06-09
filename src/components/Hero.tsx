export function Hero() {
  return (
    <section className="bg-gradient-to-b from-ogr-navy to-ogr-navy-light py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          Free Real Estate Calculators
          <span className="block text-ogr-gold mt-1">
            for Buyers, Owners, and Investors
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Estimate payments, cash flow, returns, refinance proceeds, and rental scenarios
          with simple calculators built for quick decision-making.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-gray-400">
          {[
            'Mortgage Payment',
            'Cap Rate',
            'Cash-on-Cash Return',
            'Cash-Out Refi',
            'Rent vs. Sell',
            'STR Revenue',
            'Closing Costs',
          ].map((name) => (
            <span
              key={name}
              className="bg-white/10 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
            >
              {name}
            </span>
          ))}
        </div>
        <a
          href="#calculators"
          className="inline-block mt-8 bg-ogr-gold hover:bg-ogr-gold-light text-white font-bold px-8 py-3 rounded-xl text-base transition-colors shadow-lg"
        >
          Start Calculating
        </a>
      </div>
    </section>
  );
}
