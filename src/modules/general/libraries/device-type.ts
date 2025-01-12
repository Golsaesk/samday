import { useTheme, } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isSmallScreen: boolean;
  isNormalScreen: boolean;
  isLargeScreen: boolean;
  isMobileOrTablet: boolean;
  isScreen: boolean;
  isNotMobile: boolean;
}

export const useDeviceType = (): DeviceType => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.only('xs'), { noSsr: false, });
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'), { noSsr: false, });
  const isSmallScreen = useMediaQuery(theme.breakpoints.only('md'), { noSsr: false, });
  const isNormalScreen = useMediaQuery(theme.breakpoints.only('lg'), { noSsr: false, });
  const isLargeScreen = useMediaQuery(theme.breakpoints.only('xl'), { noSsr: false, });

  return {
    isMobile,
    isTablet,
    isSmallScreen,
    isNormalScreen,
    isLargeScreen,
    isMobileOrTablet: isMobile || isTablet,
    isScreen: isSmallScreen || isLargeScreen || isNormalScreen,
    isNotMobile: isSmallScreen || isLargeScreen || isNormalScreen || isTablet,
  };
};

export const useIsMobile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'), { noSsr: false, });
  return isMobile;
};

export const useIsTablet = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'), { noSsr: false, });
  return isTablet;
};

export const useIsSmallScreen = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.only('md'), { noSsr: false, });
  return isSmallScreen;
};

export const useIsNormalScreen = () => {
  const theme = useTheme();
  const isNormalScreen = useMediaQuery(theme.breakpoints.only('lg'), { noSsr: false, });
  return isNormalScreen;
};

export const useIsBigScreen = () => {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.only('xl'), { noSsr: false, });
  return isBigScreen;
};

export const useIsDownMDScreen = () => {
  const theme = useTheme();
  const isDownMDScreen = useMediaQuery(theme.breakpoints.down('lg'), { noSsr: false, });
  return isDownMDScreen;
};