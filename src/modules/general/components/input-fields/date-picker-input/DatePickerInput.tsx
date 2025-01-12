'use client';

import { Typography, } from '@mui/material';
import styles from './DatePickerInput.module.scss';
import { DatePicker, } from '@mui/x-date-pickers/DatePicker';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CalendarIcon from '@/modules/general/components/icons/calendar';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

export default function DatePickerInput({
  open,
  label,
  value,
  onChange,
  onClose,
  error,
  onClick,
  errorText,
  defaultValue,
  displayClear = true,
  id,
  className = '',
  fullWidth,
}: {
  open: boolean;
  label: string;
  value: any;
  error: boolean;
  errorText: string;
  onClose: any;
  onChange: any;
  onClick: any;
  defaultValue?: any;
  id?: string;
  displayClear?: boolean;
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={`${styles.root} ${className} ${fullWidth ? styles.fullWidth : ''}`}>
      {value && displayClear && (
        <div
          className={styles.root__clear}
          onClick={() => onChange(null)}
        >
          <CloseRoundedIcon />
        </div>
      )}
      <DatePicker
        {...id && { id: id, }}
        defaultValue={defaultValue}
        open={open}
        label={label}
        value={value}
        onClose={onClose}
        onChange={onChange}
        className={styles.root__datePicker}
        slots={{
          openPickerButton: () =>
            (
              <ButtonInput
                disableRipple
                onClick={onClick}
                className={styles.root__datePicker__button}
                startIcon={<CalendarIcon />}
              >
              </ButtonInput>
            )
          ,
        }}
        slotProps={{
          actionBar: { actions: ['clear',], },
          textField: {
            variant: 'outlined',
            InputLabelProps: { shrink: true, },
            error: error,
            onClick: onClick,
            InputProps: {
              endAdornment: (
                <ButtonInput
                  disableRipple
                  onClick={onClick}
                  className={styles.root__datePicker__button}
                  startIcon={<CalendarIcon />}
                >
                </ButtonInput>
              ),
            },
            className: error ? styles.root__datePicker__textfield__error : '',
          },
          popper: { sx: { ".MuiPaper-root": { boxShadow: 'var(--shadow-tone1-800)', }, }, },
        }}
      />
      {error && errorText && (
        <Typography
          variant={'tiny'}
          className={styles.root__datePicker__error}
        >
          {errorText}
        </Typography>
      )}
    </div>
  );
}
