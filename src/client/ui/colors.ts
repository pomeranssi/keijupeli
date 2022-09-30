export type ColorIntensity =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
export type Palette = Record<ColorIntensity, string>;

// Primary color: FF9999
// Color picking tool:
// https://material.io/design/color/the-color-system.html#tools-for-picking-colors

const primary: Palette = {
  '50': '#ffebef',
  '100': '#ffcdd3',
  '200': '#ff9999',
  '300': '#f87172',
  '400': '#ff4f4e',
  '500': '#ff3e31',
  '600': '#f83432',
  '700': '#e5282c',
  '800': '#d82025',
  '900': '#c81118',
};

const complementary: Palette = {
  '50': '#d8ffff',
  '100': '#99ffff',
  '200': '#50fcff',
  '300': '#00f6fd',
  '400': '#00f1fa',
  '500': '#00ecfb',
  '600': '#00dae7',
  '700': '#00c3cb',
  '800': '#00aeb1',
  '900': '#008882',
};

const analogous1: Palette = {
  '50': '#fee7f3',
  '100': '#fdc1e0',
  '200': '#ff99cc',
  '300': '#ff6fb6',
  '400': '#ff4fa2',
  '500': '#ff328e',
  '600': '#f12f89',
  '700': '#d92d81',
  '800': '#c32a7c',
  '900': '#9a2671',
};

const analogous2: Palette = {
  '50': '#fff3e6',
  '100': '#ffe0c0',
  '200': '#ffcc99',
  '300': '#ffb770',
  '400': '#ffa653',
  '500': '#ff9743',
  '600': '#fe8c40',
  '700': '#f67d3d',
  '800': '#ef6e3a',
  '900': '#e45634',
};

const gray: Palette = {
  '50': '#ffffff',
  '100': '#fafafa',
  '200': '#f5f5f5',
  '300': '#f0f0f0',
  '400': '#dedede',
  '500': '#c2c2c2',
  '600': '#979797',
  '700': '#818181',
  '800': '#606060',
  '900': '#3c3c3c',
};

export const colors = { primary, complementary, analogous1, analogous2, gray };

export const almostBlack = '#222222' as const;
