
import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="mb-16 border-l-4 border-green-500 pl-8">
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-green-500 font-mono text-sm opacity-80 max-w-xl">
          &gt; {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
