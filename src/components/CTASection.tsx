export function CTASection() {
  return (
    <section id="contact" className="py-16 px-4 bg-ogr-navy">
      <div className="max-w-3xl mx-auto text-center">
        <img
          src="/ogr-logo.png"
          alt="Oilgate Realty"
          className="h-64 w-auto mx-auto mb-6 brightness-0 invert"
        />
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Need Help Analyzing a Deal?
        </h2>
        <p className="mt-3 text-gray-300 text-base max-w-xl mx-auto leading-relaxed">
          These tools are estimates. For real numbers, deal analysis, or a second look before you
          buy, rent, or refi — connect with Oilgate Realty.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:oilgaterealty@gmail.com?subject=Deal%20Analysis%20Request"
            className="bg-ogr-gold hover:bg-ogr-gold-light text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Email Oilgate Realty
          </a>
          <a
            href="#calculators"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Back to Calculators
          </a>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 text-xs text-gray-500 space-y-1">
          <p>
            These calculators are free tools provided by Oilgate Realty LLC. Not financial advice.
            Not a loan commitment.
          </p>
          <p>Verify all numbers with your lender, title company, and licensed professionals.</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Oilgate Realty LLC. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
