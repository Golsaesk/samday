'use client';

import React, { useEffect, useState, } from 'react';
import styles from './CardCheckboxGroup.module.scss';
import CardCheckbox from '@/modules/general/components/card-checkbox-components/card-checkbox';
import {
  CardCheckboxClasses, CardCheckboxGroupChange, CardCheckboxGroupPropsType,
} from '@/modules/general/libraries/general-types';

export default function CardCheckboxGroup({
  items,
  props,
  onChange,
  classes,
  defaultSelectedIndex,
  loading,
}: {
  items: CardCheckboxGroupPropsType[];
  props?: any;
  onChange: CardCheckboxGroupChange;
  classes?: CardCheckboxClasses;
  defaultSelectedIndex?: number;
  loading?: boolean;
}) {
  const
    [selectedItemIndex, setSelectedItemIndex,] = useState<number>(defaultSelectedIndex || 0),

    handleCardCheckboxSelect = (item: CardCheckboxGroupPropsType, index: number) => {
      if (item) {
        setSelectedItemIndex(index);
        onChange(item.value);
      }
    };

  useEffect(() => {
    setSelectedItemIndex(0);
  }, [items,]);

  return (
    <div
      {...props}
      className={`${styles.root} ${classes?.root || ''}`}
    >
      {loading ?
        (
          <>Loading</>
        ) :
        (
          <>
            {items && items.length > 0 && items.map((item: CardCheckboxGroupPropsType, index: number) => {
              return (
                <React.Fragment key={`CardCheckbox${index}`}>
                  <CardCheckbox
                    index={index}
                    value={item.value}
                    cardBody={item.body}
                    label={item.label || ''}
                    cardAction={item.action}
                    onSelect={() => { handleCardCheckboxSelect(item, index); }}
                    defaultChecked={index === selectedItemIndex}
                    defaultOpen={true}
                    classes={classes}
                  />
                </React.Fragment>
              );
            })}
          </>
        )
      }

    </div>
  );
}
