'use client';

import { useState, } from 'react';
import AddIcon from '@mui/icons-material/Add';
import styles from './QuantityInput.module.scss';
import RemoveIcon from '@mui/icons-material/Remove';
import { FormControl, TextField, } from '@mui/material';

export default function QuantityInput({
  value,
  vertical = false,
}: {
  value: number;
  vertical?: boolean;
}) {
  const
    [inputValue, setInputValue,] = useState<number>(value),

    hanldeDecrease = () => {
      if (inputValue > 1) {
        setInputValue(prevValue => prevValue - 1);
      }
    },

    hanldeIncrease = () => {
      setInputValue(prevValue => prevValue + 1);
    };

  return (
    <div className={`${styles.root} ${vertical ? styles.root__vertical : styles.root__horizontal}`}>
      <div
        className={styles.root__icon}
        onClick={hanldeIncrease}
      >
        <AddIcon fontSize="small" />
      </div>
      <FormControl>
        <TextField
          variant='standard'
          type='number'
          onChange={undefined}
          value={inputValue}
          inputMode='numeric'
          inputProps={{ inputMode: 'numeric', }}
          InputProps={{
            disableUnderline: true,
            readOnly: true,
            inputMode: 'numeric',
            inputProps: {
              min: 1,
              max: 99,
            },
          }}
        />
      </FormControl>
      <div
        className={`${styles.root__icon} ${inputValue === 1 ? styles.root__disable : ""}`}
        onClick={hanldeDecrease}
      >
        <RemoveIcon fontSize="small" />
      </div>
    </div>
  );
}