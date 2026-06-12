export function Header() {
  return (
    <header className="bg-ogr-navy shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/ogr-logo.png"
            alt="Oilgate Realty"
            className="h-48 w-auto object-contain brightness-0 invert"
          />
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a
            href="#calculators"
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Calculators
          </a>
          <a
            href="#how-to-use"
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            How to Use
          </a>
          <a
            href="#contact"
            className="bg-ogr-gold hover:bg-ogr-gold-light text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Contact Us
          </a>
        </nav>
        {/* Mobile contact link */}
        <a
          href="#contact"
          className="sm:hidden bg-ogr-gold hover:bg-ogr-gold-light text-white font-semibold px-3 py-1.5 rounded-lg transition-colors text-xs"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
