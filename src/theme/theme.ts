'use client';

import { CSSProperties, } from 'react';
import ColorSchemes from './color-schemes';
import * as variants from './create-theme-variants';
import { experimental_extendTheme as extendTheme, } from '@mui/material/styles';
declare module '@mui/material/Typography' {
  export interface TypographyPropsVariantOverrides {
    button1: true;
    button2: true;
    tiny: true;
    error: true;
  }
}
declare module '@mui/material/styles' {
  export interface TypographyVariants {
    button1: CSSProperties;
    button2: CSSProperties;
    tiny: CSSProperties;
    error?: CSSProperties;
  }
  // allow configuration using `createTheme`
  export interface TypographyVariantsOptions {
    button1?: CSSProperties;
    button2?: CSSProperties;
    tiny?: CSSProperties;
    error?: CSSProperties;
  }
}
declare module '@mui/material/Button' {
  export interface ButtonPropsVariantOverrides {
    square: true;
  }
}
declare module '@mui/material/Button' {
  export interface ButtonPropsVariantOverrides {
    pale: true;
  }
  export interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
declare module '@mui/material/Fab' {
  export interface FabPropsVariantOverrides {
    simple: true;
  }
}

declare module '@mui/material/Paper' {
  export interface PaperPropsVariantOverrides {
    line: true;
  }
}

const theme = extendTheme({
  colorSchemes: ColorSchemes,
  cssVarPrefix: '',
  direction: 'rtl',
  typography: {
    fontFamily: 'var(--font-family), var(--font-family-alternate)',
    button: { textTransform: 'none', },
    button1: variants.typographyButton1,
    button2: variants.typographyButton2,
    tiny: variants.typographyTiny,
    error: variants.typographyError,
  },
  components: {
    MuiButtonBase: { styleOverrides: { root: variants.buttonBaseRoot, }, },
    MuiButton: {
      styleOverrides: {
        root: variants.buttonRoot,
        containedPrimary: variants.buttonContainedPrimary,
        containedSecondary: variants.buttonContainedSecondary,
        outlinedPrimary: variants.buttonOutlinedPrimary,
        outlinedSecondary: variants.buttonOutlinedSecondary,
        endIcon: variants.buttonEndIcon,
        startIcon: variants.buttonStartIcon,
        outlinedError: variants.buttonOutlinedError,
      },
      variants: [
        {
          props: { size: 'large', },
          style: {
            paddingLeft: 'var(--spacing-xxx-large)',
            paddingRight: 'var(--spacing-xxx-large)',
          },
        },
        {
          props: { size: 'medium', },
          style: {
            paddingLeft: 'var(--spacing-xx-large)',
            paddingRight: 'var(--spacing-xx-large)',
          },
        },
        {
          props: { size: 'small', },
          style: {
            paddingLeft: 'var(--spacing-x-large)',
            paddingRight: 'var(--spacing-x-large)',
          },
        },
        {
          props: { variant: 'square', },
          style: { borderRadius: 'var(--border-radius-small)', },
        },
        {
          props: {
            variant: 'contained', color: 'tertiary',
          },
          style: { ...variants.buttonContainedTertiary, },
        },
        {
          props: {
            variant: 'outlined', color: 'tertiary',
          },
          style: { ...variants.buttonOutlinedTertiary, },
        },
        {
          props: {
            variant: 'pale', color: 'primary',
          },
          style: { ...variants.buttonPalePrimary, },
        },
        {
          props: {
            variant: 'pale', color: 'secondary',
          },
          style: { ...variants.buttonPaleSecondary, },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: variants.typographyRoot,
        h1: variants.typographyH1,
        h2: variants.typographyH2,
        h3: variants.typographyH3,
        h4: variants.typographyH4,
        h5: variants.typographyH5,
        h6: variants.typographyH6,
        body1: variants.typographyBody1,
        body2: variants.typographyBody2,
        overline: variants.typographyOverline,
        subtitle1: variants.typographySubtitle1,
        subtitle2: variants.typographySubtitle2,
      },
      defaultProps: {
        variantMapping: {
          button1: 'p',
          button2: 'p',
          error: 'p',
        },

      },
      variants: [
        {
          props: { color: 'grayLight', },
          style: { color: 'var(--color-gray-level-100)', },
        },
        {
          props: { color: 'grayMain', },
          style: { color: 'var(--color-gray-level-400)', },
        },
        {
          props: { color: 'grayDark', },
          style: { color: 'var(--color-gray-level-600)', },
        },
      ],
    },
    MuiTextField: { styleOverrides: { root: variants.textfieldRoot, }, },
    MuiInputLabel: { styleOverrides: { root: variants.inputLabelRoot, }, },
    MuiOutlinedInput: { styleOverrides: { root: variants.outlinedInputRoot, }, },
    MuiInputAdornment: {
      styleOverrides: {
        root: { margin: 0, },
        positionStart: variants.inputAdornmentStart,
        positionEnd: variants.inputAdornmentEnd,
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        endAdornment: variants.autocompleteEndAdornment,
        popupIndicator: variants.autocompletePopupIndicator,
        clearIndicator: variants.autocompleteClearIndicator,
        input: variants.autocompleteInput,
        option: variants.autocompleteOption,
        listbox: variants.autocompleteListbox,
      },
    },
    MuiRadio: { styleOverrides: { root: variants.radioRoot, }, },
    MuiInputBase: {
      styleOverrides: {
        root: variants.inputBaseRoot,
        multiline: variants.inputBaseMultiline,
      },
    },
    MuiNativeSelect: { styleOverrides: { outlined: variants.nativeSelectOutlined, }, },
    MuiPaper: { styleOverrides: { root: variants.paperRoot, }, },
    MuiList: { styleOverrides: { root: {}, }, },
    MuiMenuItem: { styleOverrides: { root: variants.menuItemRoot, }, },
    MuiCheckbox: { styleOverrides: { root: variants.checkboxRoot, }, },
    MuiSwitch: {
      variants: [ {
        props: { color: 'primary', },
        style: {
          width: 42,
          height: 24,
          padding: 0,
          borderRadius: 'var(--border-radius-x-large)',
          border: '1px solid var(--color-border-4)',
          backgroundColor: 'var(--color-background-paper-level-1)',
          '& .MuiSwitch-switchBase': {
            margin: 2,
            padding: 0,
            transform: 'translateX(1px)',
            '&.Mui-checked': {
              color: '#fff',
              transform: 'translateX(17px)',
              '& .MuiSwitch-thumb:before': { backgroundImage: 'url("/images/icon/night.svg")', },
              '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: 'transparent',
              },
            },
          },
          '& .MuiSwitch-thumb': {
            backgroundColor: 'var(--color-gray-level-700)',
            transition: 'right 150ms cubic-bezier(2, 0, 0.2, 3) 0ms,transform 150ms cubic-bezier(2, 0, 0.2, 3) 0ms',
            width: 18,
            height: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:before': {
              content: "''",
              position: 'absolute',
              width: 14,
              height: 14,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: 'url("/images/icon/day.svg")',
            },
          },
          '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: 'transparent',
            borderRadius: 20 / 2,
          },
        },
      },
      {
        props: { color: 'secondary', },
        style: {
          width: 28,
          height: 16,
          padding: 0,
          display: 'flex',
          '&:active': {
            '& .MuiSwitch-thumb': { width: 15, },
            '& .MuiSwitch-switchBase.Mui-checked': { transform: 'translateX(9px)', },
          },
          '& .MuiSwitch-thumb': {
            color: 'var(--color-gray-level-400)',
            boxShadow: 'none',
            marginTop: 1,
            marginLeft: 1,
            width: 10,
            height: 10,
            borderRadius: 5,
          },
          '& .MuiSwitch-track': {
            borderRadius: 8,
            opacity: 1,
            backgroundColor: 'var(--color-background-paper-level-1)',
            border: '1px solid var(--color-gray-level-400)',
            boxSizing: 'border-box',
          },
          '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
              transform: 'translateX(12px)',
              color: 'var(--color-gray-level-0)',
              '& .MuiSwitch-thumb': { color: 'var(--color-background-paper-level-1)', },
              '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: 'var(--color-primary-main)',
                border: '1px solid var(--color-primary-main)',
              },
            },
          },
        },
      },
      ],
    },
    MuiFormHelperText: { styleOverrides: { root: variants.formHelperTextRoot, }, },
    MuiTableCell: {
      styleOverrides: {
        head: variants.tableCellHead,
        body: variants.tableCellBody,
      },
    },
    MuiSkeleton: { styleOverrides: { root: variants.skeletonRoot, }, },
    MuiBreadcrumbs: { styleOverrides: { separator: variants.breadcrumbsSeparator, }, },
    MuiDialog: { styleOverrides: { paper: variants.dialogPaper, }, },
    MuiBackdrop: { styleOverrides: { root: variants.backdrop, }, },
    MuiFab: {
      variants: [ {
        props: {
          variant: 'simple',
          color: 'primary',
        },
        style: {
          backgroundColor: 'var(--color-gray-level-0) !important',
          boxShadow: 'none !important',
          border: '1px solid var(--color-gray-level-200)',
          cursor: ' pointer',
          height: 32,
          width: 32,
          minWidth: 'unset !important',
          minHeight: 'unset !important',
          '&:hover': {
            // backgroundColor: 'var(--color-primary-main) !important',
            border: '1px solid var(--color-primary-main)',

            '& svg': {
              fill: 'var(--color-primary-main)',
              'path': {
                color: 'var(--color-primary-main)',
                fill: 'var(--color-primary-main)',
              },
            },
          },
          zIndex: 0,

        },
      },],
    },
    MuiAccordion: {
      variants: [
        {
          props: { variant: 'line', },
          style: {
            ...variants.accordionLineRoot,
            '& .MuiAccordionSummary-root': { ...variants.accordionLineSummaryRoot, },
            '& .MuiAccordionDetails-root': { ...variants.accordionLineDetailsRoot, },
          },
        },
      ],
    },

  },
});

export default theme;