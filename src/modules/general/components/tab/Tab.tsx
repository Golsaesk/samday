'use client';

import { useState, } from 'react';
import styles from './Tab.module.scss';
import { TabOptionType, } from '@modules/general/libraries/general-types';

export type TabChange = {
  (value: number): void;
};

export default function Tab({
  options,
  className,
  props,
  onChange,
  defaultValue,
  width = 130,
}: {
  options: TabOptionType[];
  className?: string;
  props?: any;
  onChange: TabChange;
  defaultValue?: number;
  width?: number;
}) {
  const
    [value, setValue,] = useState<number>(defaultValue ?? 0),

    handleTabClick = (tabValue: number) => {
      setValue(tabValue);
      onChange(tabValue);
    };

  return (
    <>
      {options && options.length > 0 && (
        <div
          {...props}
          className={`${styles.root} ${className ?? ''}`}
          style={{ maxWidth: options.length * width, }}
        >
          <div
            className={styles.root__activeFrame}
            style={{
              right: value * width,
              width: width,
            }}
          />
          {options.map((item: TabOptionType, index: number) => {
            return (
              <div
                key={Math.random()}
                className={`${styles.root__item} ${value === index ? styles.root__item__active : ''}`}
                onClick={() => handleTabClick(index)}
                style={{ width: width, }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}