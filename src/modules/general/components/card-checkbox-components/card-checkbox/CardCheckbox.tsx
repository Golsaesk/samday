'use client';

import {
  ReactNode, useEffect, useState,
} from 'react';
import { Collapse, } from '@mui/material';
import styles from './CardCheckbox.module.scss';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import { CardCheckboxClasses, } from '@/modules/general/libraries/general-types';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export type CardCheckboxChange = {
  (value: boolean): void;
};

const CardCheckbox = ({
  index,
  label,
  classes,
  props,
  onSelect,
  cardBody,
  cardAction,
  value,
  onToggleCollapse,
  defaultChecked,
  defaultOpen,
}: {
  index: number;
  label: string;
  classes?: CardCheckboxClasses;
  props?: any;
  onSelect: CardCheckboxChange;
  cardBody: ReactNode;
  cardAction?: ReactNode;
  value: any;
  onToggleCollapse?: any;
  defaultChecked: boolean;
  defaultOpen: boolean;
}) => {

  const
    deviceType = useDeviceType(),
    [checked, setChecked,] = useState<boolean>(defaultChecked),
    [isOpen, setIsOpen,] = useState<boolean>(defaultOpen),

    handleToggleCollapse = () => {
      if (onToggleCollapse) {
        onToggleCollapse(index);
      }
      setIsOpen(!isOpen);
    },

    handleClick = () => {
      onSelect(value);
      setChecked(true);
    };

  useEffect(() => {
    setChecked(defaultChecked);
  }, [
    defaultChecked,
  ]);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [
    defaultOpen,
  ]);

  return (
    <div
      {...props}
      className={`${styles.root} ${classes?.base || ''} ${checked ? styles.root__active : ''}`}
    >
      <div className={`${styles.root__header} ${classes?.header || ''} ${isOpen ? styles.root__header__open : ''}`}>
        <div
          onClick={handleClick}
          className={`${styles.root__header__icon} ${checked ? styles.root__header__icon__checked : ''} ${classes?.icon || ''}`}
        >
          {checked && (
            <CheckRoundedIcon />
          )}
        </div>
        {label}
        <div
          onClick={handleToggleCollapse}
          className={`${styles.root__header__collapse} ${(!deviceType.isMobile || isOpen) ? styles.root__header__collapse__open : ''}`}
        >
          <KeyboardArrowDownRoundedIcon />
        </div>
      </div>
      <Collapse in={deviceType.isMobile ? isOpen : true}>
        <div className={`${classes?.content || ''}`}>
          {cardBody}
        </div>
      </Collapse>
      <div className={`${styles.root__footer} ${classes?.footer || ''}`}>
        {cardAction}
      </div>
    </div>
  );
};

export default CardCheckbox;