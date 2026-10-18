import React from 'react';

interface PaintCanImageProps {
  type:
    | 'cat-interior-20l'
    | 'cat-interior-5l'
    | 'cat-kayu-1l'
    | 'thinner-a-20l'
    | 'thinner-a-5l'
    | 'thinner-super-1l'
    | 'cat-anti-bocor-5l'
    | 'cat-putih-20l';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const PaintCanImage: React.FC<PaintCanImageProps> = ({
  type,
  size = 'md',
  className = '',
}) => {
  // Dimensions
  const dimensionMap = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    hero: 'w-48 h-48',
  };

  const containerSize = dimensionMap[size];

  switch (type) {
    case 'cat-interior-20l':
    case 'cat-putih-20l':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full drop-shadow-md select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Handle */}
            <path
              d="M32 60 C32 20, 128 20, 128 60"
              stroke="#94A3B8"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Top Rim */}
            <ellipse cx="80" cy="46" rx="52" ry="12" fill="#CBD5E1" stroke="#64748B" strokeWidth="2.5" />
            <ellipse cx="80" cy="45" rx="46" ry="9" fill="#E2E8F0" />
            <ellipse cx="80" cy="44" rx="40" ry="7" fill="#F8FAFC" />

            {/* Bucket Body */}
            <path
              d="M28 46 L38 136 C38 144, 122 144, 122 136 L132 46 Z"
              fill="url(#can-metal-gradient-blue)"
              stroke="#64748B"
              strokeWidth="2"
            />
            
            {/* Bottom Ellipse */}
            <ellipse cx="80" cy="136" rx="42" ry="8" fill="#94A3B8" opacity="0.6" />

            {/* Label Background */}
            <path
              d="M34 68 C48 76, 112 76, 126 68 L123 118 C110 125, 50 125, 37 118 Z"
              fill="#0284C7"
            />
            {/* Label Highlights & Text */}
            <path
              d="M34 68 C48 76, 112 76, 126 68 L125 76 C112 84, 48 84, 35 76 Z"
              fill="#0369A1"
            />
            <rect x="52" y="76" width="56" height="34" rx="4" fill="#FFFFFF" opacity="0.95" />
            <text
              x="80"
              y="88"
              fill="#0369A1"
              fontSize="8"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              CAT
            </text>
            <text
              x="80"
              y="97"
              fill="#0F172A"
              fontSize="7.5"
              fontWeight="800"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              TEMBOK
            </text>
            <text
              x="80"
              y="105"
              fill="#64748B"
              fontSize="6"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              Interior
            </text>

            {/* Metallic Shine */}
            <path
              d="M48 48 L54 136"
              stroke="#FFFFFF"
              strokeWidth="5"
              opacity="0.35"
              strokeLinecap="round"
            />

            <defs>
              <linearGradient id="can-metal-gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CBD5E1" />
                <stop offset="25%" stopColor="#F1F5F9" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="75%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case 'cat-interior-5l':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Handle */}
            <path d="M36 62 C36 26, 124 26, 124 62" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
            {/* Top Rim */}
            <ellipse cx="80" cy="50" rx="48" ry="11" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
            <ellipse cx="80" cy="49" rx="42" ry="8" fill="#F8FAFC" />

            {/* Bucket Body */}
            <path
              d="M32 50 L42 134 C42 142, 118 142, 118 134 L128 50 Z"
              fill="url(#can-metal-5l)"
              stroke="#64748B"
              strokeWidth="2"
            />

            {/* Label */}
            <path
              d="M37 72 C50 78, 110 78, 123 72 L120 114 C108 120, 52 120, 40 114 Z"
              fill="#0D9488"
            />
            <rect x="54" y="78" width="52" height="30" rx="3" fill="#FFFFFF" />
            <text x="80" y="89" fill="#0D9488" fontSize="7" fontWeight="900" textAnchor="middle">
              CAT
            </text>
            <text x="80" y="98" fill="#1E293B" fontSize="6.5" fontWeight="800" textAnchor="middle">
              TEMBOK
            </text>
            <text x="80" y="105" fill="#0D9488" fontSize="5.5" fontWeight="700" textAnchor="middle">
              5 Liter
            </text>

            <defs>
              <linearGradient id="can-metal-5l" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CBD5E1" />
                <stop offset="30%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case 'cat-kayu-1l':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Cylindrical Tin */}
            <ellipse cx="80" cy="42" rx="44" ry="10" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
            <ellipse cx="80" cy="41" rx="38" ry="7" fill="#E2E8F0" />

            <path
              d="M36 42 L36 132 C36 142, 124 142, 124 132 L124 42 Z"
              fill="#15803D"
              stroke="#64748B"
              strokeWidth="2"
            />
            {/* Metal Ring */}
            <path d="M36 42 C40 50, 120 50, 124 42" stroke="#CBD5E1" strokeWidth="3" />
            <ellipse cx="80" cy="132" rx="44" ry="10" fill="#166534" />

            {/* Label */}
            <rect x="48" y="65" width="64" height="48" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
            <circle cx="80" cy="80" r="10" fill="#15803D" />
            <path d="M76 82 L80 75 L84 82 Z" fill="#FFFFFF" />
            <text x="80" y="99" fill="#14532D" fontSize="8" fontWeight="800" textAnchor="middle">
              CAT KAYU
            </text>
            <text x="80" y="108" fill="#854D0E" fontSize="6" fontWeight="700" textAnchor="middle">
              1 Liter
            </text>
          </svg>
        </div>
      );

    case 'thinner-a-20l':
    case 'thinner-a-5l':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Tall rectangular metallic solvent can */}
            <path
              d="M40 40 L120 40 L124 136 L36 136 Z"
              fill="url(#metal-thinner)"
              stroke="#475569"
              strokeWidth="2"
            />
            {/* Spout / Cap */}
            <rect x="52" y="28" width="18" height="12" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
            {/* Top Handle */}
            <path d="M74 36 L106 36" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />

            {/* Label */}
            <rect x="42" y="58" width="76" height="62" rx="2" fill="#FFFFFF" />
            <rect x="42" y="58" width="76" height="16" fill="#DC2626" />
            <text x="80" y="70" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle">
              THINNER A
            </text>
            <text x="80" y="86" fill="#1E293B" fontSize="8" fontWeight="800" textAnchor="middle">
              SPECIAL
            </text>
            <rect x="58" y="94" width="44" height="18" rx="2" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1" />
            <text x="80" y="106" fill="#1D4ED8" fontSize="7" fontWeight="800" textAnchor="middle">
              {type === 'thinner-a-20l' ? 'DRUM 20L' : 'EMBER 5L'}
            </text>

            <defs>
              <linearGradient id="metal-thinner" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="35%" stopColor="#F8FAFC" />
                <stop offset="70%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case 'thinner-super-1l':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md select-none" fill="none">
            {/* Bottle or slim can */}
            <path
              d="M48 48 L112 48 L116 138 L44 138 Z"
              fill="url(#can-thinner-super)"
              stroke="#64748B"
              strokeWidth="2"
            />
            {/* Cap */}
            <rect x="70" y="32" width="20" height="16" rx="2" fill="#E11D48" stroke="#9F1239" strokeWidth="1.5" />

            {/* Label */}
            <rect x="48" y="66" width="64" height="52" fill="#FFFFFF" />
            <rect x="48" y="66" width="64" height="14" fill="#0284C7" />
            <text x="80" y="76" fill="#FFFFFF" fontSize="7" fontWeight="900" textAnchor="middle">
              THINNER
            </text>
            <text x="80" y="93" fill="#E11D48" fontSize="9" fontWeight="900" textAnchor="middle">
              SUPER
            </text>
            <text x="80" y="108" fill="#475569" fontSize="6.5" fontWeight="700" textAnchor="middle">
              1 Liter
            </text>

            <defs>
              <linearGradient id="can-thinner-super" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CBD5E1" />
                <stop offset="40%" stopColor="#FFFFFF" />
                <stop offset="80%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    case 'cat-anti-bocor-5l':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md select-none" fill="none">
            <path d="M36 60 C36 24, 124 24, 124 60" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="80" cy="48" rx="46" ry="10" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />

            <path
              d="M34 48 L42 134 C42 142, 118 142, 118 134 L126 48 Z"
              fill="#B91C1C"
              stroke="#7F1D1D"
              strokeWidth="2"
            />
            {/* Label */}
            <rect x="52" y="74" width="56" height="40" rx="3" fill="#FFFFFF" />
            <text x="80" y="88" fill="#B91C1C" fontSize="7" fontWeight="900" textAnchor="middle">
              ANTI BOCOR
            </text>
            <text x="80" y="99" fill="#1E293B" fontSize="6.5" fontWeight="800" textAnchor="middle">
              WATERPROOF
            </text>
            <text x="80" y="108" fill="#0284C7" fontSize="6" fontWeight="700" textAnchor="middle">
              5 Liter
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative flex items-center justify-center ${containerSize} bg-slate-100 rounded-lg ${className}`}>
          <span className="text-xs font-bold text-slate-500">CAN</span>
        </div>
      );
  }
};
