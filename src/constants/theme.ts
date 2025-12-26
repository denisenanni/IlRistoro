export const COLORS = {
  primary: '#7B2D34',
  primaryHover: '#5f2329',
} as const;

export const BUTTON_STYLES = {
  primary: `bg-[${COLORS.primary}] text-white hover:bg-[${COLORS.primaryHover}]`,
  iconButton: 'p-2 rounded-full hover:bg-stone-100 transition-colors',
  quantityButton: 'w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center hover:bg-stone-100 transition-colors',
  deleteButton: 'w-8 h-8 rounded-full text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors',
} as const;

export const INPUT_STYLES = {
  base: 'w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors',
  textarea: 'w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#7B2D34] focus:ring-1 focus:ring-[#7B2D34] outline-none transition-colors resize-none',
} as const;

export const LAYOUT = {
  maxWidth: 'max-w-lg',
  headerHeight: '73px',
} as const;
