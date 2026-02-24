/**
 * The base colors that can be used in the themes. The names should not convey there purposes.
 */
export const baseColor = {
  primary: {
    black: '#000000',
    blue: '#004699',
    red: '#ec0000',
    white: '#ffffff',
  },
  neutral: {
    grey1: '#E8E8E8',
    grey2: '#BEBEBE',
    grey3: '#767676',
    grey4: '#323232',
  },
  secondary: {
    darkgreen: '#00a03c',
    lightgreen: '#bed200',
    orange: '#ff9100',
    magenta: '#e50082',
    purple: '#a00078',
    yellow: '#ffe600',
    /**
     * Design system name: Interaction/Hover
     */
    darkblue: '#102E62',
  },
  // Colors which are not part of the design system
  custom: {
    grey0: '#ebeff5',
  },
  transparent: {
    full: 'transparent',
    white30: '#ffffff4c',
    lightGrey44: '#bfbfbf44',
    grey50: '#46464680',
    black90: '#000000e6',
    black30: '#0000004d',
    blue25: '#00469940',
  },
} as const
