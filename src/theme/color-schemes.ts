import {
  ColorSystemOptions, PaletteColorChannel, SupportedColorScheme,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'] | PaletteColorChannel;
  }
}

const ColorSchemes: Partial<Record<SupportedColorScheme, ColorSystemOptions>> = {
  light: {
    palette: {
      mode: 'light',

      primary: {
        light: 'var(--color-primary-minus-1)',
        main: 'var(--color-primary-main)',
        dark: 'var(--color-primary-plus-1)',
        contrastText: 'var(--color-primary-contrast-text)',
        lightChannel: 'var(--color-primary-minus-1)',
        mainChannel: 'var(--color-primary-main)',
        darkChannel: 'var(--color-primary-plus-1)',
        contrastTextChannel: 'var(--color-primary-plus-1)',
      },
      secondary: {
        light: 'var(--color-secondary-minus-1)',
        main: 'var(--color-secondary-main)',
        dark: 'var(--color-secondary-plus-1)',
        contrastText: 'var(--color-secondary-contrast-text)',
        lightChannel: 'var(--color-secondary-minus-1)',
        mainChannel: 'var(--color-secondary-main)',
        darkChannel: 'var(--color-secondary-plus-1)',
      },
      info: {
        light: 'var(--color-info-minus-1)',
        main: 'var(--color-info-main)',
        dark: 'var(--color-info-plus-1)',
        contrastText: 'var(--color-info-contrast-text)',
        lightChannel: 'var(--color-info-minus-1)',
        mainChannel: 'var(--color-info-main)',
        darkChannel: 'var(--color-info-plus-1)',
      },
      success: {
        light: 'var(--color-success-minus-1)',
        main: 'var(--color-success-main)',
        dark: 'var(--color-success-plus-1)',
        contrastText: 'var(--color-success-contrast-text)',
        lightChannel: 'var(--color-success-minus-1)',
        mainChannel: 'var(--color-success-main)',
        darkChannel: 'var(--color-success-plus-1)',
      },
      error: {
        light: 'var(--color-error-minus-1)',
        main: 'var(--color-error-main)',
        dark: 'var(--color-error-plus-1)',
        contrastText: 'var(--color-error-contrast-text)',
        lightChannel: 'var(--color-error-minus-1)',
        mainChannel: 'var(--color-error-main)',
        darkChannel: 'var(--color-error-plus-1)',
      },
      warning: {
        light: 'var(--color-warning-minus-1)',
        main: 'var(--color-warning-main)',
        dark: 'var(--color-warning-plus-1)',
        contrastText: 'var(--color-warning-contrast-text)',
      },
      action: {
        active: 'var(--color-action-active)',
        activeChannel: 'var(--color-action-active)',
        hover: 'var(--color-action-hover)',
        focus: 'var(--color-action-focus)',
        selected: 'var(--color-action-selected)',
        selectedChannel: 'var(--color-action-selected)',
        disabled: 'var(--color-action-disabled)',
        disabledBackground: 'var(--color-action-disabled-background)',
      },
      common: {
        white: 'var(--white)',
        black: 'var(--black)',
      },
      text: {
        primary: 'var(--color-text-primary-main)',
        secondary: 'var(--color-text-primary-minus-2)',
        disabled: 'var(--color-action-disabled)',
        primaryChannel: 'var(--color-text-primary-main)',
        secondaryChannel: 'var(--color-text-primary-minus-2)',
      },
      background: {
        default: 'var(--color-background-page-1)',
        defaultChannel: 'var(--color-background-default)',
        paper: 'var(--color-background-paper-level-1)',
        paperChannel: 'var(--color-background-paper-level-1)',
      },
      divider: 'var(--color-divider-1)',
      dividerChannel: 'var(--color-divider-1)',
      grey: {
        '50': 'var(--color-gray-level-50)',
        '100': 'var(--color-gray-level-100)',
        '200': 'var(--color-gray-level-200)',
        '300': 'var(--color-gray-level-300)',
        '400': 'var(--color-gray-level-400)',
        '500': 'var(--color-gray-level-500)',
        '600': 'var(--color-gray-level-600)',
        '700': 'var(--color-gray-level-700)',
        '800': 'var(--color-gray-level-800)',
        '900': 'var(--color-gray-level-900)',
      },
      tertiary: {
        light: 'var(--color-tertiary-minus-1)',
        main: 'var(--color-tertiary-main)',
        dark: 'var(--color-tertiary-plus-1)',
        contrastText: 'var(--color-tertiary-contrast-text)',
        lightChannel: 'var(--color-tertiary-minus-1)',
        mainChannel: 'var(--color-tertiary-main)',
        darkChannel: 'var(--color-tertiary-plus-1)',
      },
    },
  },
  dark: {
    palette: {
      mode: 'dark',
      primary: {
        light: 'var(--color-primary-minus-1)',
        main: 'var(--color-primary-main)',
        dark: 'var(--color-primary-plus-1)',
        contrastText: 'var(--color-primary-contrast-text)',
        lightChannel: 'var(--color-primary-minus-1)',
        mainChannel: 'var(--color-primary-main)',
        darkChannel: 'var(--color-primary-plus-1)',
        contrastTextChannel: 'var(--color-primary-plus-1)',
      },
      secondary: {
        light: 'var(--color-secondary-minus-1)',
        main: 'var(--color-secondary-main)',
        dark: 'var(--color-secondary-plus-1)',
        contrastText: 'var(--color-secondary-contrast-text)',
        lightChannel: 'var(--color-secondary-minus-1)',
        mainChannel: 'var(--color-secondary-main)',
        darkChannel: 'var(--color-secondary-plus-1)',
      },
      info: {
        light: 'var(--color-info-minus-1)',
        main: 'var(--color-info-main)',
        dark: 'var(--color-info-plus-1)',
        contrastText: 'var(--color-info-contrast-text)',
        lightChannel: 'var(--color-info-minus-1)',
        mainChannel: 'var(--color-info-main)',
        darkChannel: 'var(--color-info-plus-1)',
      },
      success: {
        light: 'var(--color-success-minus-1)',
        main: 'var(--color-success-main)',
        dark: 'var(--color-success-plus-1)',
        contrastText: 'var(--color-success-contrast-text)',
        lightChannel: 'var(--color-success-minus-1)',
        mainChannel: 'var(--color-success-main)',
        darkChannel: 'var(--color-success-plus-1)',
      },
      error: {
        light: 'var(--color-error-minus-1)',
        main: 'var(--color-error-main)',
        dark: 'var(--color-error-plus-1)',
        contrastText: 'var(--color-error-contrast-text)',
        lightChannel: 'var(--color-error-minus-1)',
        mainChannel: 'var(--color-error-main)',
        darkChannel: 'var(--color-error-plus-1)',
      },
      warning: {
        light: 'var(--color-warning-minus-1)',
        main: 'var(--color-warning-main)',
        dark: 'var(--color-warning-plus-1)',
        contrastText: 'var(--color-warning-contrast-text)',
      },
      action: {
        active: 'var(--color-action-active)',
        activeChannel: 'var(--color-action-active)',
        hover: 'var(--color-action-hover)',
        focus: 'var(--color-action-focus)',
        selected: 'var(--color-action-selected)',
        selectedChannel: 'var(--color-action-selected)',
        disabled: 'var(--color-action-disabled)',
        disabledBackground: 'var(--color-action-disabled-background)',
      },
      common: {
        white: 'var(--white)',
        black: 'var(--black)',
      },
      text: {
        primary: 'var(--color-text-primary-main)',
        secondary: 'var(--color-text-primary-minus-2)',
        disabled: 'var(--color-action-disabled)',
        primaryChannel: 'var(--color-text-primary-main)',
        secondaryChannel: 'var(--color-text-primary-minus-2)',
      },
      background: {
        default: 'var(--color-background-page-1)',
        defaultChannel: 'var(--color-background-default)',
        paper: 'var(--color-background-paper-level-1)',
        paperChannel: 'var(--color-background-paper-level-1)',
      },
      divider: 'var(--color-divider-1)',
      dividerChannel: 'var(--color-divider-1)',
      grey: {
        '50': 'var(--color-gray-level-50)',
        '100': 'var(--color-gray-level-100)',
        '200': 'var(--color-gray-level-200)',
        '300': 'var(--color-gray-level-300)',
        '400': 'var(--color-gray-level-400)',
        '500': 'var(--color-gray-level-500)',
        '600': 'var(--color-gray-level-600)',
        '700': 'var(--color-gray-level-700)',
        '800': 'var(--color-gray-level-800)',
        '900': 'var(--color-gray-level-900)',
      },
      tertiary: {
        light: 'var(--color-tertiary-minus-1)',
        main: 'var(--color-tertiary-main)',
        dark: 'var(--color-tertiary-plus-1)',
        contrastText: 'var(--color-tertiary-contrast-text)',
        lightChannel: 'var(--color-tertiary-minus-1)',
        mainChannel: 'var(--color-tertiary-main)',
        darkChannel: 'var(--color-tertiary-plus-1)',
      },
    },
  },
};

export default ColorSchemes;