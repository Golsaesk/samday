'useClient';

import { ReactNode, useState, } from 'react';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import styles from './FilterItemLayout.module.scss';
import ArrowDownIcon from '@/modules/general/components/icons/arrow-down';

export default function FilterItemLayout({
  children,
  label,
  isActive,
  activeItemsCount,
  border = true,
  className,
  collapseClassName,
}: {
  children: ReactNode;
  label: string;
  isActive?: boolean;
  border?: boolean;
  activeItemsCount?: number;
  className?: string;
  collapseClassName?: string;
}) {
  const
    [open, setOpen, ] = useState<boolean>(false),

    handleCollapseToggle = () => {
      setOpen(prev => !prev);
    };

  return (
    <>
      {label ?
        (
          <div className={`${styles.root} ${border ? styles.root__border : ''} ${className || ''}`}>
            <div
              onClick={handleCollapseToggle}
              className={`${styles.root__header} ${open ? styles.root__header__collapsed : ''}`}
            >
              <Typography
                variant={'body1'}
                className={styles.root__header__text}
              >
                {label}
                {(isActive || activeItemsCount) && (
                  <span className={`${styles.root__header__text__badge} 
            ${activeItemsCount && styles.root__header__text__badge__count}`}
                  >
                    {activeItemsCount ?? ''}
                  </span>
                )}
              </Typography>
              <ArrowDownIcon />
            </div>
            <Collapse in={open}>
              <div className={`${styles.root__collapse} ${collapseClassName || ''}`}>
                {children}
              </div>
            </Collapse>
          </div>
        ) : (
          <div className={`${styles.root} ${border && styles.root__border}`}>
            {children}
          </div>
        )}
    </>
  );
}