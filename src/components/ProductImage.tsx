import React from 'react';

interface ProductImageProps {
  imageKey: string;
  alt: string;
  className?: string;
  aspectRatio?: '4/3' | '16/9' | '1/1';
}

export const ProductImage: React.FC<ProductImageProps> = ({
  imageKey,
  alt,
  className = '',
  aspectRatio = '4/3'
}) => {
  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  // Renders dedicated artisan coffee shop food & drink visual artwork
  const renderIllustration = () => {
    switch (imageKey) {
      case 'cappuccino':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#2D1B10] via-[#482E1E] to-[#1E110A] flex items-center justify-center overflow-hidden">
            {/* Wooden cafe tabletop background */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#8F5B34_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#D4A373]/15 blur-2xl" />
            
            {/* Roasted coffee beans scattered */}
            <div className="absolute bottom-3 left-4 w-3.5 h-2.5 rounded-full bg-[#1C0E05] rotate-45 border border-[#3A1E0D]" />
            <div className="absolute bottom-4 left-9 w-3 h-2 rounded-full bg-[#2A1608] -rotate-12 border border-[#482613]" />
            <div className="absolute bottom-2 right-6 w-3.5 h-2.5 rounded-full bg-[#221207] rotate-25 border border-[#3A1E0D]" />

            {/* Cup Saucer */}
            <div className="relative flex items-center justify-center">
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-[#ECE7DF] shadow-[0_15px_30px_rgba(0,0,0,0.45)] border-4 border-[#DBD3C6] flex items-center justify-center p-3">
                {/* White Ceramic Cup Rim */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#F5F2EB] shadow-inner border-2 border-[#D6CBB8] flex items-center justify-center p-2.5 relative">
                  {/* Crema espresso body */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#C68642] via-[#8D4E1A] to-[#5C2E0C] shadow-inner flex items-center justify-center relative overflow-hidden">
                    {/* Dark espresso rim */}
                    <div className="absolute inset-0 rounded-full border-[6px] border-[#66350E]/80" />
                    
                    {/* Latte Art: Rosetta / Heart */}
                    <div className="relative w-20 h-20 flex flex-col items-center justify-center">
                      {/* Top heart leaf */}
                      <div className="w-8 h-8 bg-[#FFF9EE] rounded-full shadow-sm flex items-center justify-center mb-[-6px]">
                        <div className="w-6 h-6 bg-[#FFF9EE] rotate-45 transform origin-center" />
                      </div>
                      {/* Mid leaves */}
                      <div className="w-12 h-6 bg-[#FFF8EB] rounded-full shadow-sm flex justify-between px-1 mb-[-4px]">
                        <div className="w-4 h-4 bg-[#FFF8EB] rounded-full" />
                        <div className="w-4 h-4 bg-[#FFF8EB] rounded-full" />
                      </div>
                      <div className="w-14 h-5 bg-[#FFF8EB] rounded-full shadow-sm mb-[-3px]" />
                      {/* Stem */}
                      <div className="w-1.5 h-7 bg-[#FFF8EB] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Cup handle */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 rounded-r-xl border-4 border-[#DBD3C6] bg-transparent" />
            </div>

            {/* Paz y Espresso brand stamp */}
            <div className="absolute bottom-2.5 right-3 text-[10px] tracking-widest uppercase font-semibold text-[#D4A373]/80">
              Paz y Espresso
            </div>
          </div>
        );

      case 'frappe':
      case 'mocha_cold':
      case 'iced_latte':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#1C140D] via-[#3B2515] to-[#26150B] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:14px_14px]" />
            <div className="absolute top-2 left-6 w-28 h-28 rounded-full bg-[#D4A373]/20 blur-xl" />

            {/* Iced glass tumbler */}
            <div className="relative w-28 sm:w-32 h-44 sm:h-48 rounded-b-2xl rounded-t-lg bg-gradient-to-b from-white/20 via-white/10 to-white/5 border border-white/30 backdrop-blur-sm p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex flex-col justify-end overflow-hidden">
              {/* Whipped cream top */}
              <div className="absolute top-1 left-1 right-1 h-12 bg-gradient-to-b from-[#FFFDF9] to-[#F3EDE2] rounded-t-lg shadow-md flex items-center justify-center">
                {/* Caramel drizzle */}
                <svg className="w-full h-full absolute inset-0 opacity-80" viewBox="0 0 100 40">
                  <path d="M10,10 Q25,30 40,12 T70,25 T95,15" stroke="#7E4211" strokeWidth="3" fill="none" />
                  <path d="M5,25 Q30,15 55,28 T90,20" stroke="#B87333" strokeWidth="2" fill="none" />
                </svg>
                {/* Straw */}
                <div className="absolute -top-6 right-6 w-2.5 h-16 bg-gradient-to-r from-[#D4A373] to-[#8C532B] rounded-full rotate-12 shadow" />
              </div>

              {/* Frappé coffee swirl layers */}
              <div className="w-full h-32 rounded-b-xl bg-gradient-to-b from-[#8C532B] via-[#C99863] to-[#542B0D] relative overflow-hidden flex flex-col justify-between p-2">
                {/* Ice cubes effect */}
                <div className="absolute top-3 left-3 w-5 h-5 bg-white/25 rounded border border-white/40 rotate-12" />
                <div className="absolute top-7 right-4 w-6 h-6 bg-white/20 rounded border border-white/30 -rotate-12" />
                <div className="absolute bottom-5 left-5 w-5 h-5 bg-white/25 rounded border border-white/40 rotate-45" />
                
                {/* Condensation drops */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#2D1606]/30 to-[#1F0C02]/60" />
              </div>
            </div>

            <div className="absolute bottom-2.5 right-3 text-[10px] tracking-widest uppercase font-semibold text-[#D4A373]/80">
              Frappé Frío
            </div>
          </div>
        );

      case 'chocolate_cake':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#24140C] via-[#381F12] to-[#170B05] flex items-center justify-center overflow-hidden">
            <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-[#693B1F]/20 blur-xl" />
            
            {/* Ceramic Plate */}
            <div className="relative w-44 h-40 sm:w-52 sm:h-44 rounded-[50%] bg-[#F0EDE6] shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-4 border-[#DBD4C5] flex items-center justify-center p-3">
              {/* Chocolate Cake Slice (Isometric wedge) */}
              <div className="relative w-32 h-28 flex flex-col justify-center items-center">
                {/* Cake Wedge */}
                <div className="w-28 h-20 bg-gradient-to-br from-[#381B0C] to-[#1F0F06] rounded-sm shadow-xl relative overflow-hidden border-t-2 border-[#542C15]">
                  {/* Sponge texture layers */}
                  <div className="absolute top-3 left-0 right-0 h-2 bg-[#1A0C04] border-y border-[#4A250F]" />
                  <div className="absolute top-8 left-0 right-0 h-2.5 bg-[#2B1407] border-y border-[#4A250F]" />
                  <div className="absolute top-14 left-0 right-0 h-2 bg-[#1A0C04] border-y border-[#4A250F]" />
                  
                  {/* Glossy chocolate fudge drizzle */}
                  <div className="absolute -top-1 left-0 right-0 h-5 bg-gradient-to-r from-[#200D04] via-[#4A220D] to-[#1F0C04] rounded-t-sm shadow-md flex justify-around">
                    <div className="w-2 h-4 bg-[#200D04] rounded-b-full shadow" />
                    <div className="w-2.5 h-6 bg-[#200D04] rounded-b-full shadow" />
                    <div className="w-2 h-5 bg-[#200D04] rounded-b-full shadow" />
                  </div>
                </div>
                {/* Chocolate curls decoration */}
                <div className="absolute -top-2 right-6 w-4 h-4 rounded-full border-2 border-[#1E0C03] bg-[#3B1A08] rotate-45 shadow" />
                <div className="absolute -top-1 right-11 w-3 h-3 rounded-full border-2 border-[#1E0C03] bg-[#2E1406] shadow" />
              </div>
            </div>

            <div className="absolute bottom-2.5 right-3 text-[10px] tracking-widest uppercase font-semibold text-[#D4A373]/80">
              Cacao 70%
            </div>
          </div>
        );

      case 'chicken_sandwich':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#271E15] via-[#3E2D1D] to-[#1C140C] flex items-center justify-center overflow-hidden">
            {/* Wooden Cutting Board */}
            <div className="relative w-48 h-36 sm:w-52 sm:h-40 bg-gradient-to-r from-[#8E5A34] via-[#A66E43] to-[#7B4C29] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.45)] border-2 border-[#683E20] flex items-center justify-center p-3">
              {/* Sandwich halves */}
              <div className="relative flex flex-col items-center">
                {/* Golden toasted Ciabatta bread top */}
                <div className="w-36 h-10 bg-gradient-to-b from-[#D9A066] via-[#C98B4F] to-[#A36B36] rounded-t-2xl border-t border-[#F0BC85] shadow-md flex justify-around px-3 pt-1">
                  <div className="w-2 h-1 bg-[#855325] rounded-full rotate-12" />
                  <div className="w-2.5 h-1 bg-[#855325] rounded-full -rotate-12" />
                  <div className="w-2 h-1 bg-[#855325] rounded-full rotate-45" />
                </div>
                {/* Filling layers */}
                <div className="w-38 h-8 flex flex-col justify-center -my-1 z-10">
                  {/* Lettuce */}
                  <div className="w-full h-3 bg-[#6C9A36] rounded-full shadow-sm flex items-center justify-around px-1">
                    <div className="w-3 h-2 bg-[#84BA42] rounded-full" />
                    <div className="w-3 h-2 bg-[#557D29] rounded-full" />
                  </div>
                  {/* Shredded chicken breast with creamy mayo */}
                  <div className="w-full h-4 bg-[#F2DEB9] border-y border-[#D6BD92] shadow-sm flex items-center px-3 text-[9px] font-bold text-[#8F6A38]">
                    Pollo & Apio
                  </div>
                </div>
                {/* Bottom bread */}
                <div className="w-36 h-8 bg-gradient-to-t from-[#B0773E] to-[#C98B4F] rounded-b-xl border-b border-[#7D4F23] shadow-md" />
              </div>
            </div>

            <div className="absolute bottom-2.5 right-3 text-[10px] tracking-widest uppercase font-semibold text-[#D4A373]/80">
              Artesanal
            </div>
          </div>
        );

      case 'blueberry_muffin':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#251A12] via-[#3C2719] to-[#1A1009] flex items-center justify-center overflow-hidden">
            <div className="relative flex flex-col items-center justify-center">
              {/* Muffin top crown */}
              <div className="w-28 h-18 bg-gradient-to-b from-[#BF793E] via-[#A8632C] to-[#8C4F20] rounded-full shadow-xl relative flex items-center justify-center border-t border-[#E89E5F] z-10">
                {/* Blueberries & chocolate chips */}
                <div className="absolute top-3 left-6 w-3.5 h-3.5 bg-[#2B1B47] rounded-full border border-[#48346E] shadow-sm" />
                <div className="absolute top-2 right-8 w-4 h-4 bg-[#23153A] rounded-full border border-[#48346E] shadow-sm" />
                <div className="absolute bottom-3 left-11 w-3 h-3 bg-[#2F1C4E] rounded-full border border-[#48346E] shadow-sm" />
                <div className="absolute top-6 right-5 w-3 h-3 bg-[#1C0D05] rounded-sm rotate-45 shadow" />
              </div>
              {/* Ribbed paper cup */}
              <div className="w-20 h-16 bg-gradient-to-b from-[#D2AF84] to-[#B38D5C] -mt-5 rounded-b-lg border border-[#8C6B40] shadow-md flex justify-around px-2 pt-4">
                <div className="w-0.5 h-full bg-[#8C6B40]/40" />
                <div className="w-0.5 h-full bg-[#8C6B40]/40" />
                <div className="w-0.5 h-full bg-[#8C6B40]/40" />
                <div className="w-0.5 h-full bg-[#8C6B40]/40" />
              </div>
            </div>

            <div className="absolute bottom-2.5 right-3 text-[10px] tracking-widest uppercase font-semibold text-[#D4A373]/80">
              Recién Horneado
            </div>
          </div>
        );

      case 'croissant':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#2A1D13] via-[#422C1A] to-[#1E1208] flex items-center justify-center overflow-hidden">
            <div className="relative flex items-center justify-center">
              {/* Golden Crescent shape */}
              <div className="relative w-36 h-24 bg-gradient-to-b from-[#E5A352] via-[#C98132] to-[#99571A] rounded-[45%] shadow-[0_12px_28px_rgba(0,0,0,0.5)] border-t border-[#FAD082] flex items-center justify-center">
                {/* Flaky pastry layers */}
                <div className="w-24 h-18 border-y-2 border-[#80420E] rounded-full -rotate-6" />
                <div className="absolute w-28 h-12 border-t-2 border-[#FCE1A4]/60 rounded-full rotate-6" />
                <div className="absolute left-2 w-5 h-8 bg-[#B86E24] rounded-l-full" />
                <div className="absolute right-2 w-5 h-8 bg-[#B86E24] rounded-r-full" />
              </div>
            </div>

            <div className="absolute bottom-2.5 right-3 text-[10px] tracking-widest uppercase font-semibold text-[#D4A373]/80">
              100% Mantequilla
            </div>
          </div>
        );

      case 'cheesecake':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#261611] via-[#3C1F18] to-[#1A0B07] flex items-center justify-center overflow-hidden">
            <div className="relative w-44 h-36 bg-[#F3EDE3] rounded-[50%] shadow-[0_15px_30px_rgba(0,0,0,0.45)] border-4 border-[#DDD3C2] flex items-center justify-center">
              {/* Cheesecake Slice */}
              <div className="relative w-28 h-20 bg-gradient-to-b from-[#FFFDF5] to-[#F7ECD5] rounded-sm shadow-xl flex flex-col justify-between border border-[#E8DCBF] overflow-hidden">
                {/* Red Berry Coulis Topping */}
                <div className="w-full h-6 bg-gradient-to-r from-[#800C1F] via-[#A81734] to-[#6E0A19] relative flex items-center justify-around px-2 shadow">
                  <div className="w-3 h-3 bg-[#4D0512] rounded-full shadow" />
                  <div className="w-2.5 h-2.5 bg-[#4D0512] rounded-full shadow" />
                  <div className="w-3 h-3 bg-[#4D0512] rounded-full shadow" />
                </div>
                {/* Cookie Crust Base */}
                <div className="w-full h-4 bg-gradient-to-r from-[#A86E3A] to-[#8C5523] border-t border-[#6E3F15]" />
              </div>
            </div>

            <div className="absolute bottom-2.5 right-3 text-[10px] tracking-widest uppercase font-semibold text-[#D4A373]/80">
              Frutos Rojos
            </div>
          </div>
        );

      case 'chocolate_cookies':
      case 'cookies':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#24170D] via-[#392415] to-[#1A0F07] flex items-center justify-center overflow-hidden">
            <div className="relative flex items-center justify-center gap-2">
              {/* Cookie 1 */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#CF955B] via-[#B87A3E] to-[#915926] shadow-xl border-t border-[#F2C291] relative flex items-center justify-center">
                {/* Dark chocolate chunks */}
                <div className="absolute top-3 left-4 w-3.5 h-3.5 bg-[#210D04] rounded-sm rotate-12" />
                <div className="absolute bottom-3 right-4 w-3.5 h-3.5 bg-[#210D04] rounded-sm -rotate-45" />
                <div className="absolute top-8 right-3 w-3 h-3 bg-[#210D04] rounded-sm rotate-45" />
                <div className="absolute bottom-6 left-3 w-2.5 h-2.5 bg-[#210D04] rounded-sm" />
              </div>
              {/* Cookie 2 */}
              <div className="w-18 h-18 -ml-5 -mt-3 rounded-full bg-gradient-to-br from-[#B87A3E] via-[#A66931] to-[#804A1A] shadow-lg border-t border-[#DEAA77] relative flex items-center justify-center">
                <div className="absolute top-4 right-3 w-3 h-3 bg-[#210D04] rounded-sm rotate-25" />
                <div className="absolute bottom-4 left-3 w-3 h-3 bg-[#210D04] rounded-sm" />
              </div>
            </div>

            <div className="absolute bottom-2.5 right-3 text-[10px] tracking-widest uppercase font-semibold text-[#D4A373]/80">
              Chispas Cacao
            </div>
          </div>
        );

      case 'bread':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#281A10] via-[#432A18] to-[#1E1108] flex items-center justify-center overflow-hidden">
            <div className="w-32 h-20 bg-gradient-to-b from-[#C98B47] to-[#8C5220] rounded-full shadow-xl border-t-2 border-[#EAB277] flex items-center justify-around px-3">
              <div className="w-1 h-12 bg-[#5E320E] rounded-full rotate-25" />
              <div className="w-1 h-14 bg-[#5E320E] rounded-full rotate-25" />
              <div className="w-1 h-12 bg-[#5E320E] rounded-full rotate-25" />
            </div>
          </div>
        );

      case 'coffee':
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#2B170B] via-[#442714] to-[#1A0C05] flex items-center justify-center overflow-hidden">
            <div className="w-24 h-24 rounded-full bg-[#EAE4D8] border-4 border-[#C8BEAB] shadow-xl flex items-center justify-center">
              <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#8A4C1B] to-[#422008] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#FFF6E5]/80 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#8A4C1B]" />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`overflow-hidden relative select-none ${aspectClass} ${className}`}>
      {renderIllustration()}
    </div>
  );
};
