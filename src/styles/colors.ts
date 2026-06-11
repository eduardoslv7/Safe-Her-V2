export const colors = {
  // Rosa
  pink: {
    50: '#fce7f3',
    100: '#fbcfe8',
    200: '#f9a8d4',
    300: '#f472b6',
    400: '#ec4899',
    500: '#ec4899', // primary
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
  },
  // Roxo 
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
  },
  // Rosa claro (backgrounds)
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    500: '#f43f5e',
  },
  // Utilitários
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // Cinza
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Status
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#10b981',
    600: '#059669',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    500: '#eab308',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    500: '#f97316',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
