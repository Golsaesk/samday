'use client';

import styles from './ButtonInput.module.scss';
import LoadingButton, { LoadingButtonProps, } from '@mui/lab/LoadingButton';

interface ButtonInputProps extends LoadingButtonProps {
  hideTextOnSmallDevice?: boolean;
  tooltip?: string;
  indicatorClass?: string;
  target?: string;
  width?: string | number;
}

export default function ButtonInput({
  children,
  fullWidth,
  endIcon,
  startIcon,
  variant,
  className,
  hideTextOnSmallDevice,
  indicatorClass,
  ...props
}: ButtonInputProps) {

  return (
    <LoadingButton
      {...props}
      fullWidth={fullWidth}
      {...endIcon && { endIcon: endIcon, }}
      {...startIcon && { startIcon: startIcon, }}
      variant={variant ? variant : 'contained'}
      classes={{
        loadingIndicator: styles.loadingIndicator__root,
        root: `${styles.root} ${className || ''} ${variant === 'outlined' ? styles.root__outlined : ''} ${hideTextOnSmallDevice && (startIcon || endIcon) ? styles.root__hideOnSmallDevice : ''}`,
        ...endIcon && ({ loadingIndicatorEnd: `${styles.loadingIndicator} ${indicatorClass || ''}`, }),
        ...startIcon && ({ loadingIndicatorStart: `${styles.loadingIndicator} ${indicatorClass || ''}`, }),
      }}
      {... (endIcon || startIcon) && { loadingPosition: `${endIcon ? 'end' : 'start'}`, }}
    >
      <span className='title'>
        {children}
      </span>
    </LoadingButton>
  );
}
