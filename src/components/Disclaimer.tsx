export function Disclaimer() {
  return (
    <section className="py-8 px-4 bg-ogr-bg-alt border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-yellow-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-yellow-500 text-lg mt-0.5 flex-shrink-0">&#9888;</div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">Important Disclaimer</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All results shown by these calculators are <strong>estimates only</strong> and are provided
                for informational and educational purposes. They do <strong>not</strong> constitute financial
                advice, a loan quote, a guarantee of loan terms, or a binding offer of any kind.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mt-2">
                Actual mortgage payments, closing costs, cash flow, and returns will vary based on your
                lender, loan type, credit profile, property taxes, insurance rates, market conditions,
                vacancy, management, and other factors. Always verify numbers with a licensed lender,
                title company, CPA, or real estate professional before making financial decisions.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Oilgate Realty LLC — these tools are provided as a free resource and do not create a
                client, advisory, or professional relationship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
