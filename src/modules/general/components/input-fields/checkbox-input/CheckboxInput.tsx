import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import styles from './CheckboxInput.module.scss';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckboxInput({
  label,
  readOnly,
  tabIndex,
  onChange,
  value,
  id,
}: {
  label: string | React.ReactNode;
  readOnly?: boolean;
  tabIndex?: number;
  onChange?: any;
  value?: boolean;
  id?: string;
}) {

  return (
    <div className={styles.root}>
      <FormControlLabel
        {...readOnly && { disabled: readOnly, } }
        control={
          <Checkbox
            {...id && { id: id, } }
            {...readOnly && { disabled: readOnly, } }
            {...value && { checked: true, } }
            {...(tabIndex && tabIndex > 0) && { inputProps: { tabIndex: tabIndex, }, } }
            onChange={onChange}
          />
        }
        label={label}
      />
    </div>
  );
}
