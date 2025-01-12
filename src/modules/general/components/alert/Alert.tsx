'use client';

import React, { ReactNode, } from 'react';
import styles from './Alert.module.scss';
import { Typography, } from '@mui/material';
import { AlertStatus, } from '@/modules/general/libraries/general-types';
import AlertInfoIcon from '@/modules/general/components/icons/alert-info';
import AlertErrorIcon from '@/modules/general/components/icons/alert-error';
import AlertSuccessIcon from '@/modules/general/components/icons/alert-success';
import AlertWarningIcon from '@/modules/general/components/icons/alert-warning';

const Alert = ({
  status,
  title,
  description,
  children,
  icon = false,
  justifyIcon = false,
  shadow,
  outlined,
  filled,
  className = '',
  titleIcon,
}: {
  status: AlertStatus;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  icon?: boolean;
  justifyIcon?: boolean;
  shadow?: boolean;
  outlined?: boolean;
  filled?: boolean;
  className?: string;
  titleIcon?: ReactNode;
}) => {
  return (
    <div className={`${styles.root} ${className} ${shadow ? styles.root__shadow : ''} alert_${AlertStatus[status]} ${outlined ? 'alert_outlined' : ''} ${filled ? 'alert_filled' : ''}`}>
      {icon && (
        <div className={`${styles.root__icon} ${justifyIcon && styles.root__icon__justify}`}>
          {
            {
              '0': <AlertSuccessIcon />,
              '1': <AlertInfoIcon />,
              '2': <AlertWarningIcon />,
              '3': <AlertErrorIcon />,
            }[status]
          }
        </div>
      )}
      <div className={styles.root__content}>
        {title && (
          <Typography
            variant={'button1'}
            className={`${titleIcon ? styles.root__content__title : ''}`}
          >
            {titleIcon}
            {title}
          </Typography>
        )}
        {description && (
          <div className={styles.root__content__description}>
            {description}
          </div>
        )}
        <div className={styles.root__content__children}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Alert;
