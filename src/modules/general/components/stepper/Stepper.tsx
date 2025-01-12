'use client';

import React from 'react';
import styles from './Stepper.module.scss';
import { useTranslations, } from 'next-intl';
import { CircularProgress, Typography, } from '@mui/material';
import CheckedIcon from '@/modules/general/components/icons/checked';
import { StepType, StepperStatus, } from '@/modules/general/libraries/general-types';

export type StepperChangeFunctionType = {
  (index: number): void;
};

export default function Stepper({
  items,
  currentStep,
  onChange,
  className = '',
  disabled = false,
}: {
  items: StepType[];
  currentStep: number;
  onChange: StepperChangeFunctionType;
  className?: string;
  disabled?: boolean;
}) {
  const t = useTranslations();

  return (
    <>
      {items && items.length > 0 && (
        <div className={`${styles.root} ${className}`}>
          <div className={styles.root__desktop}>
            {items.map((item: StepType, index: number) => {
              return (
                <React.Fragment
                  key={`Stepper_${index}`}
                >
                  <div
                    onClick={() => (item.status !== StepperStatus.waiting && !disabled) && onChange(index)}
                    className={`${styles.root__step} ${item.status !== StepperStatus.waiting && styles.root__step__hasLink}`}
                  >
                    <div className={styles.root__step__number}>
                      <Typography
                        variant={'h4'}
                        component={'p'}
                        className={`stepNumber_${item.status}`}
                      >
                        {item.status === StepperStatus.done ? (
                          <CheckedIcon />
                        ) : (
                          <>{index + 1}</>
                        )}
                      </Typography>
                    </div>
                    <Typography
                      variant={'h5'}
                      component={'span'}
                      className={`${styles.root__step__label} stepLabel_${item.status}`}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant={'tiny'}
                      component={'span'}
                      className={`${styles.root__step__status} stepStatus_${item.status}`}
                    >
                      {t(`common.stepper_status_${item.status}`)}
                    </Typography>
                  </div>
                  {items.length !== index + 1 && (
                    <div className={styles.root__connector}>
                      <div className={`${styles.root__connector__line} ${item.status === StepperStatus.running ? styles.root__connector__line__running :
                        item.status === StepperStatus.done ? styles.root__connector__line__done : ''}`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className={styles.root__mobile}>
            <div className={styles.root__mobile__circle}>
              <div className={styles.root__mobile__circle__background}></div>
              <CircularProgress
                variant="determinate"
                value={(currentStep + 1) * 100 / items.length}
                size={70}
                classes={{ determinate: styles.root__circle__progress, }}
                color={'success'}
              />
              <Typography
                variant={'subtitle2'}
                className={styles.root__mobile__circle__text}
              >
                {`${currentStep + 1} ${t('common.from')} ${items.length}`}
              </Typography>
            </div>
            <div className={styles.root__mobile__title}>
              <Typography variant={'subtitle1'}>
                {items.map((item: StepType, index: number) => {
                  return (
                    <React.Fragment key={`${index}`}>
                      {index === currentStep && item.label}
                    </React.Fragment>
                  );
                })}
              </Typography>
              {items[currentStep + 1] && (
                <Typography variant={'caption'}>
                  {`${t('paging.next_page')}: ${items[currentStep + 1].label}`}
                </Typography>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}