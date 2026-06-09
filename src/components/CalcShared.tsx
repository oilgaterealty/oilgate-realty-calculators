import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  help?: string;
}

export function InputField({ label, value, onChange, prefix, suffix, placeholder, help }: InputFieldProps) {
  return (
    <div>
      <label className="calc-label">{label}</label>
      {help && <p className="calc-help">{help}</p>}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-gray-400 text-sm select-none pointer-events-none z-10">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? '0'}
          className={`calc-input ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 text-gray-400 text-sm select-none pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

interface OutputRowProps {
  label: string;
  value: string;
  colorClass?: string;
  large?: boolean;
  divider?: boolean;
}

export function OutputRow({ label, value, colorClass, large, divider }: OutputRowProps) {
  return (
    <div className={`flex justify-between items-center py-2 ${divider ? 'border-t border-white/10 mt-2 pt-3' : ''}`}>
      <span className={`text-gray-300 ${large ? 'text-sm font-semibold' : 'text-xs'}`}>{label}</span>
      <span className={`font-bold ${large ? 'text-xl' : 'text-sm'} ${colorClass ?? 'text-white'}`}>
        {value}
      </span>
    </div>
  );
}

interface OutputSectionProps {
  children: React.ReactNode;
  empty?: boolean;
  emptyMessage?: string;
}

export function OutputSection({ children, empty, emptyMessage }: OutputSectionProps) {
  if (empty) {
    return (
      <div className="lg:col-span-2 bg-ogr-navy-dark p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-gray-400 text-sm text-center">{emptyMessage ?? 'Enter values to see results.'}</p>
      </div>
    );
  }
  return (
    <div className="lg:col-span-2 bg-ogr-navy-dark p-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Estimated Results</p>
      {children}
    </div>
  );
}

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-3 w-full py-2 rounded-lg text-xs font-semibold transition-colors
        bg-ogr-gold hover:bg-ogr-gold-light text-white"
    >
      {copied ? 'Copied!' : label}
    </button>
  );
}
