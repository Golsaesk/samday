/* eslint-disable max-len */
import { CSSInterpolation, } from '@mui/material/styles';

export const buttonBaseRoot = {
  display: 'flex !important',
  gap: 'var(--spacing-xx-small)',
  '&.MuiFab-root': {
    backgroundColor: 'var(--color-table-tools-button) !important',
    border: '1px solid var(--color-table-border) !important',
    'svg': {
      fill: 'var(--color-table-tools-icon) !important',
      '*': { fill: 'var(--color-table-tools-icon) !important', },
    },

    '&:hover': {
      'svg': {
        fill: 'var(--color-primary-main) !important',
        '*': { fill: 'var(--color-primary-main) !important', },
      },
    },
  },
  'svg': {
    width: 20,
    height: 20,
    minWidth: 20,
  },
};

export const buttonRoot = {
  height: 40,
  boxShadow: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--spacing-normal) var(--spacing-x-large)',
  borderRadius: 'var(--border-radius-xx-large)',
  gap: 'var(--spacing-small)',
  fontSize: 'var(--font-size-button1)',
  fontWeight: 'var(--font-weight-button1)',

  'svg': {
    minWidth: 20,
    maxWidth: 20,
    height: 20,
    margin: '0 !important',
    fill: `var(--color-button-primary-plus-1)`,
    color: `var(--color-button-primary-plus-1)`,

    path: {
      minWidth: 16,
      maxWidth: 16,
    },

  },
};

export const buttonContainedPrimary = {
  backgroundColor: 'var(--color-button-primary-main)',
  transition: 'all .4s ease-in-out',
  color: 'var(--color-button-primary-contrast-text)',
  '&:hover': {
    backgroundColor: 'var(--color-button-primary-hover)',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    border: 'none',
    color: 'var(--color-button-primary-text-disabled)',
    backgroundColor: 'var(--color-button-primary-minus-2)',
  },
  'svg': {
    fill: 'var(--color-button-primary-contrast-text)',
    marginRight: 'var(--spacing-x-small)',
    'path': {
      color: 'var(--color-button-primary-contrast-text)',
      fill: 'var(--color-button-primary-contrast-text)',
    },
  },
  '&.Mui-disabled svg': {
    fill: 'var(--color-button-primary-text-disabled)',
    'path': { fill: 'var(--color-button-primary-text-disabled)', },
  },
};

export const buttonContainedSecondary = {
  backgroundColor: 'var(--color-button-secondary-main)',
  transition: 'all .4s ease-in-out',
  color: 'var(--color-button-secondary-contrast-text)',
  '&:hover': {
    backgroundColor: 'var(--color-button-secondary-hover)',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    border: 'none',
    color: 'var(--color-button-secondary-text-disabled)',
    backgroundColor: 'var(--color-button-secondary-minus-2)',
  },
  'svg': {
    fill: 'var(--color-button-secondary-contrast-text)',
    marginRight: 'var(--spacing-x-small)',
    'path': { fill: 'var(--color-button-secondary-contrast-text)', },
  },
  '&.Mui-disabled svg': {
    fill: 'var(--color-button-secondary-text-disabled)',
    'path': { fill: 'var(--color-button-secondary-text-disabled)', },
  },
};

export const buttonContainedTertiary = {
  backgroundColor: 'var(--color-button-secondary-main)',
  transition: 'all .4s ease-in-out',
  color: 'var(--color-button-secondary-contrast-text)',
  '&:hover': {
    backgroundColor: 'var(--color-button-secondary-hover)',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    border: 'none',
    color: 'var(--color-button-secondary-text-disabled)',
    backgroundColor: 'var(--color-button-secondary-minus-2)',
  },
  'svg': {
    fill: 'var(--color-button-secondary-contrast-text)',
    marginRight: 'var(--spacing-x-small)',
    'path': { fill: 'var(--color-button-secondary-contrast-text)', },
  },
  '&.Mui-disabled svg': {
    fill: 'var(--color-button-secondary-text-disabled)',
    'path': { fill: 'var(--color-button-secondary-text-disabled)', },
  },
};

export const buttonOutlinedPrimary = {
  border: '1px solid var(--color-button-primary-plus-1)',
  overflow: 'hidden',
  display: 'inline-block',
  color: 'var(--color-button-primary-plus-1)',
  '&:hover': {
    backgroundColor: 'var(--color-button-primary-minus-4)',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    border: '1px solid var(--color-button-primary-minus-2)',
    color: 'var(--color-button-primary-minus-2)',
  },
  'svg': {
    fill: 'var(--color-button-primary-plus-1)',
    marginRight: 'var(--spacing-x-small)',
    'path': { fill: 'var(--color-button-primary-plus-1)', },
  },
  '&.Mui-disabled svg': {
    fill: 'var(--color-button-primary-minus-2)',
    'path': { fill: 'var(--color-button-primary-minus-2)', },
  },
};

export const buttonOutlinedSecondary = {
  border: '1px solid var(--color-button-secondary-plus-1)',
  overflow: 'hidden',
  display: 'inline-block',
  color: 'var(--color-button-secondary-plus-1)',
  '&:hover': {
    backgroundColor: 'var(--color-button-secondary-minus-4)',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    border: '1px solid var(--color-button-secondary-minus-2)',
    color: 'var(--color-button-secondary-minus-2)',
  },
  'svg': {
    fill: 'var(--color-button-secondary-plus-1)',
    marginRight: 'var(--spacing-x-small)',
    'path': { fill: 'var(--color-button-secondary-plus-1)', },
  },
  '&.Mui-disabled svg': {
    fill: 'var(--color-button-secondary-minus-2)',
    'path': { fill: 'var(--color-button-secondary-minus-2)', },
  },
};

export const buttonOutlinedTertiary = {
  border: '1px solid var(--color-button-secondary-plus-1)',
  overflow: 'hidden',
  display: 'inline-block',
  color: 'var(--color-button-secondary-plus-1)',
  '&:hover': {
    backgroundColor: 'var(--color-button-secondary-minus-4)',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    border: '1px solid var(--color-button-secondary-minus-2)',
    color: 'var(--color-button-secondary-minus-2)',
  },
  'svg': {
    fill: 'var(--color-button-secondary-plus-1)',
    marginRight: 'var(--spacing-x-small)',
    'path': { fill: 'var(--color-button-secondary-plus-1)', },
  },
  '&.Mui-disabled svg': {
    fill: 'var(--color-button-secondary-minus-2)',
    'path': { fill: 'var(--color-button-secondary-minus-2)', },
  },
};

export const buttonOutlinedError = {
  border: '1px solid var(--color-error-main)',
  'svg': {
    fill: 'var(--color-error-main)',
    marginRight: 'var(--spacing-x-small)',
    'path': { fill: 'var(--color-error-main)', },
  },
};

export const buttonPalePrimary = {
  border: '1px solid var(--color-button-primary-plus-1)',
  backgroundColor: 'var(--color-button-primary-minus-4)',
  transition: 'all .4s ease-in-out',
  color: 'var(--color-button-primary-plus-1)',
  '&:hover': {
    border: '1px solid var(--color-button-primary-plus-1)',
    backgroundColor: 'var(--color-button-primary-minus-4)',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    color: 'var(--color-button-primary-minus-2)',
    backgroundColor: 'var(--color-button-primary-minus-4)',
  },
  'svg': {
    fill: 'var(--color-button-primary-plus-1)',
    marginRight: 'var(--spacing-x-small)',
    'path': { fill: 'var(--color-button-primary-plus-1)', },
  },
  '&.Mui-disabled svg': {
    fill: 'var(--color-button-primary-minus-2)',
    'path': { fill: 'var(--color-button-primary-minus-2)', },
  },
};

export const buttonPaleSecondary = {
  border: '1px solid transparent',
  backgroundColor: 'var(--color-button-secondary-minus-4)',
  transition: 'all .4s ease-in-out',
  color: 'var(--color-button-secondary-plus-1)',
  '&:hover': {
    border: '1px solid var(--color-button-secondary-plus-1)',
    backgroundColor: 'var(--color-button-secondary-minus-4)',
    boxShadow: 'none',
  },
  '&.Mui-disabled': { color: 'var(--color-button-secondary-minus-2)', },
  'svg': {
    fill: 'var(--color-button-secondary-plus-1)',
    marginRight: 'var(--spacing-x-small)',
    'path': { fill: 'var(--color-button-secondary-plus-1)', },
  },
  '&.Mui-disabled svg': {
    fill: 'var(--color-button-secondary-minus-2)',
    'path': { fill: 'var(--color-button-secondary-minus-2)', },
  },
};

export const buttonEndIcon = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  margin: 0,
  'svg': {
    width: 20,
    height: 20,
  },
};

export const buttonStartIcon = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  margin: 0,
  'svg': {
    width: 20,
    height: 20,
  },
};

export const typographyRoot = {};

export const typographyH1 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-h1)',
  fontWeight: 'var(--font-weight-h1)',
  lineHeight: 'var(--line-height-h1)',
};

export const typographyH2 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-h2)',
  fontWeight: 'var(--font-weight-h2)',
  lineHeight: 'var(--line-height-h2)',
};

export const typographyH3 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-h3)',
  fontWeight: 'var(--font-weight-h3)',
  lineHeight: 'var(--line-height-h3)',
};

export const typographyH4 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-h4)',
  fontWeight: 'var(--font-weight-h4)',
  lineHeight: 'var(--line-height-h4)',
};

export const typographyH5 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-h5)',
  fontWeight: 'var(--font-weight-h5)',
  lineHeight: 'var(--line-height-h5)',
};

export const typographyH6 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-h6)',
  fontWeight: 'var(--font-weight-h6)',
  lineHeight: 'var(--line-height-h6)',
};

export const typographyBody1 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-body1)',
  fontWeight: 'var(--font-weight-body1)',
  lineHeight: 'var(--line-height-body1)',
};

export const typographyBody2 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-body2)',
  fontWeight: 'var(--font-weight-body2)',
  lineHeight: 'var(--line-height-body2)',
};

export const typographyButton1 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-button1)',
  fontWeight: 'var(--font-weight-button1)',
  lineHeight: 'var(--line-height-button1)',
};

export const typographyButton2 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-button2)',
  fontWeight: 'var(--font-weight-button2)',
  lineHeight: 'var(--line-height-button2)',
};

export const typographyTiny = {
  fontSize: 'var(--font-size-tiny)',
  fontWeight: 'var(--font-weight-tiny)',
  lineHeight: 'var(--line-height-tiny)',
};

export const typographyOverline = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-overline)',
  fontWeight: 'var(--font-weight-overline)',
  lineHeight: 'var(--line-height-overline)',
};

export const typographySubtitle1 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-subtitle1)',
  fontWeight: 'var(--font-weight-subtitle1)',
  lineHeight: 'var(--line-height-subtitle1)',
};

export const typographySubtitle2 = {
  color: 'var(--color-gray-level-900)',
  fontSize: 'var(--font-size-subtitle2)',
  fontWeight: 'var(--font-weight-subtitle2)',
  lineHeight: 'var(--line-height-subtitle2)',
};

export const typographyError = {
  color: 'var(--color-error-main)',
  fontSize: 'var(--font-size-subtitle2)',
  fontWeight: 'var(--font-weight-subtitle2)',
  lineHeight: 'var(--line-height-subtitle2)',
};

export const inputAdornmentStart = {
  margin: '0  0 0 var(--spacing-large)',
  'svg': {
    color: 'var(--color-gray-level-600)',
    fill: 'var(--color-gray-level-600)',
  },
};

export const inputAdornmentEnd = {
  margin: '0 var(--spacing-large) 0 0 ',
  'svg': {
    color: 'var(--color-gray-level-600)',
    fill: 'var(--color-gray-level-600)',
  },
};

export const textfieldRoot = {
  fontSize: 'var(--font-size-normal)',
  '& label': { top: '1px', },
};

export const inputLabelRoot = {
  color: 'var(--color-gray-level-700)',
  fontSize: 'var(--font-size-normal)',
  '&.Mui-focused': { color: 'var(--color-gray-level-700) !important', },
  top: '1px',
  zIndex: '0',
};

export const outlinedInputRoot = {
  borderRadius: 'var(--border-radius-small)',
  height: 48,
  fontSize: 'var(--font-size-normal)',
  'fieldset': { border: '1px solid var(--color-gray-level-300) !important', },
  '&:hover fieldset': { border: '1px solid var(--color-gray-level-500) !important', },
  '&.Mui-focused fieldset': { border: '1px solid var(--color-gray-level-800) !important', },
  '&.Mui-error fieldset ': { border: '1px solid var(--color-error-main) !important', },
  '&.Mui-disabled ': {
    'fieldset ': { border: '1px solid var(--color-gray-level-200) !important', },
    'svg': { fill: 'var(--color-gray-level-200)', },
  },
};

export const inputBaseRoot: CSSInterpolation = {
  fontSize: 'var(--font-size-normal)',
  fontFamily: 'var(--font-family), var(--font-family-alternate)',
  'svg': {
    color: 'var(--color-gray-level-600)',
    fill: 'var(--color-gray-level-600)',
  },
};

export const inputBaseMultiline = { height: 'auto !important', };

export const nativeSelectOutlined = {
  'option': {
    cursor: 'pointer',
    padding: 'var(--spacing-large)',
  },
};

export const paperRoot = {
  borderRadius: 'var(--border-radius-small)',
  boxShadow: 'var(--shadow)',
};

export const menuItemRoot = {
  cursor: 'pointer',
  fontSize: 'var(--font-size-normal)',
  '&.Mui-selected': { backgroundColor: 'var(--color-gray-level-100) !important', },
  ':hover': { backgroundColor: 'var(--color-gray-level-50)', },
};

export const checkboxRoot = {
  paddingLeft: 0,
  paddingRight: 'var(--spacing-normal)',
  paddingTop: 0,
  paddingBottom: 0,
  backgroundColor: 'transparent',
  'svg': {
    width: 16,
    height: 16,
    minWidth: 'unset',
    margin: '0px',
    fill: 'none !important',
    color: 'transparent',
    borderWidth: '1.5px',
    borderColor: 'var(--color-gray-level-400)',
    borderStyle: 'solid',
    borderRadius: '4px',
    "& path": {
      fill: 'transparent !important',
      stroke: 'transparent !important',
      strokeWidth: '0px',
      d:
        "path('')",
    },
  },
  'svg[data-testid="CheckBoxIcon"]': {
    borderColor: 'var(--color-primary-main)',
    backgroundColor: 'var(--color-primary-main)',
    "& path": {
      fill: 'white !important',
      d:
        "path('M20.6143 5.78823C20.1 5.27058 19.3286 5.27058 18.8143 5.78823L9.17143 15.4941L5.18571 11.4823C4.67143 10.9647 3.9 10.9647 3.38571 11.4823C2.87143 12 2.87143 12.7765 3.38571 13.2941L8.27143 18.2118C8.52857 18.4706 8.78571 18.6 9.17143 18.6C9.55714 18.6 9.81429 18.4706 10.0714 18.2118L20.6143 7.59999C21.1286 7.08235 21.1286 6.30588 20.6143 5.78823Z')",
    },
  },
  'svg[data-testid="CheckBoxOutlineBlankIcon"]': {
    color: 'var(--color-gray-level-400) !important',
    fill: 'var(--color-gray-level-400) !important',
  },
  '&.MuiCheckbox-colorSecondary': {
    '&.Mui-checked': {
      'svg[data-testid="CheckBoxIcon"]': {
        color: 'var(--color-secondary-main)',
        fill: 'var(--color-secondary-main)',
        'rect': {
          color: 'var(--color-secondary-main)',
          fill: 'var(--color-secondary-main)',
        },
      },
    },
  },
  '&.MuiCheckbox-colorPrimary': {
    '&.Mui-checked': {
      'svg[data-testid="CheckBoxIcon"]': {
        color: 'var(--color-primary-main)',
        fill: 'var(--color-primary-main)',
        'rect': {
          color: 'var(--color-primary-main)',
          fill: 'var(--color-primary-main)',
        },
      },
      'svg[data-testid="CheckBoxOutlineBlankIcon"]': {
        color: 'var(--color-primary-main)',
        fill: 'var(--color-primary-main)',
        'rect': {
          color: 'var(--color-primary-main)',
          fill: 'var(--color-primary-main)',
        },
      },
    },
  },
  '& .MuiTouchRipple-child': { backgroundColor: 'var(--color-gray-level-600) !important', },
};

export const formHelperTextRoot = {
  color: 'var(--color-gray-level-500)',
  fontSize: 'var(--font-size-tiny)',
  fontWeight: 'var(--font-weight-tiny)',
  lineHeight: 'var(--line-height-tiny)',
  marginLeft: 0,
  marginRight: 0,
  '& span': {
    fontSize: 'var(--font-size-tiny)',
    fontWeight: 'var(--font-weight-tiny)',
    lineHeight: 'var(--line-height-tiny)',
  },
};

export const tableCellHead = {
  height: 40,
  borderBottom: '1px solid var(--color-divider-2)',
  fontSize: 'var(--font-size-body2)',
  fontWeight: 'var(--font-weight-body2)',
  padding: 'var(--spacing-normal)',
  '&:last-child': { paddingRight: 'var(--spacing-xx-large)', },
  '&:first-child': { paddingLeft: 'var(--spacing-xx-large)', },
};

export const skeletonRoot = { backgroundColor: 'var(--color-gray-level-100)', };

export const tableCellBody = {
  height: 50,
  border: 'none',
  padding: 'var(--spacing-large)',
  '&:last-child': { paddingRight: 'var(--spacing-xx-large)', },
  '&:first-child': { paddingLeft: 'var(--spacing-xx-large)', },
};

export const breadcrumbsSeparator = {
  margin: 0,
  'svg': {
    fill: 'var(--color-gray-level-400)',
    maxWidth: 20,
  },
};

export const radioRoot: CSSInterpolation = {
  fontSize: 'var(--font-size-normal)',
  padding: 'var(--spacing-normal)',
  '& svg': {
    width: 16,
    height: 16,
    minWidth: 16,
    '&[data-testid="RadioButtonUncheckedIcon"]': { fill: 'var(--color-gray-level-400)', },
  },
  '&.Mui-checked': { '& svg': { fill: 'var(--color-primary-main)', }, },
  '& span': {
    width: 16,
    height: 16,
  },
};

export const autocompleteEndAdornment: CSSInterpolation = { display: 'flex', };

export const autocompletePopupIndicator: CSSInterpolation = {
  transition: 'all 400ms ease-in-out',
  '& svg': {
    marginTop: 2,
    '& path': { d: "path('M8.12 9.29 12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7a.9959.9959 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z')", },
  },
};

export const autocompleteClearIndicator: CSSInterpolation = {
  transition: 'all 400ms ease-in-out',
  '& svg': {
    marginTop: 2,
    width: 16,
    height: 16,
    '& path': { d: "path('M18.3 5.71a.9959.9959 0 0 0-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z')", },
  },
};

export const autocompleteInput: CSSInterpolation = {
  paddingTop: '4.5px !important',
  color: 'var(--color-gray-level-700)',
};

export const autocompleteOption: CSSInterpolation = {
  fontSize: 'var(--font-size-body1)',
  '&:hover': { backgroundColor: 'var(--color-gray-level-50) !important', },
  '&:selected': { backgroundColor: 'var(--color-gray-level-100) !important', },
  '&:focused': { backgroundColor: 'var(--color-gray-level-50) !important', },
  '&[data-focus="true"]': { backgroundColor: 'var(--color-gray-level-50) !important', },
  '&[aria-selected="true"]': { backgroundColor: 'var(--color-gray-level-100) !important', },
  '&[aria-selected="true"].Mui-focused': { backgroundColor: 'var(--color-gray-level-100) !important', },
  '&.Mui-selected': { backgroundColor: 'var(--color-gray-level-100) !important', },
};

export const autocompleteListbox: CSSInterpolation = { '& .MuiAutocomplete-option.Mui-focused': { backgroundColor: 'var(--color-gray-level-50) !important', }, };

export const dialogPaper: CSSInterpolation = { borderRadius: 'var(--border-radius-large)', };

export const backdrop: CSSInterpolation = { backgroundColor: 'var(--color-background-backdrop)', };

export const fabSimple = {
  backgroundColor: 'none !important',
  borderColor: 'red !important',
  margin: '10px !important',
};

export const accordionLineRoot = {
  backgroundColor: 'var(--color-gray-level-10)',
  borderColor: 'var(--color-border-1) !important',
  borderWidth: '1px !important',
  borderStyle: 'solid',
  borderRadius: 'var(--border-radius-normal) !important',
  '&:before': { display: 'none', },
  padding: 'var(--spacing-normal)',
};
export const accordionLineSummaryRoot = {
  fontSize: 'var(--font-size-subtitle2)',
  fontWeight: 'var(--font-weight-subtitle2)',
};

export const accordionLineDetailsRoot = {
  fontSize: 'var(--font-size-body2)',
  fontWeight: 'var(--font-weight-body2)',
  marginLeft: 'var(--spacing-xxx-large)',
  borderLeftColor: 'var(--color-gray-level-300) !important',
  borderLeftWidth: '2px !important',
  borderLeftStyle: 'solid',
  marginBottom: 'var(--spacing-xx-large)',
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: 'var(--spacing-normal)',
  paddingRight: '0',
};
