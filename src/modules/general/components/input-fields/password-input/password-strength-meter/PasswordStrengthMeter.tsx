'use client';

import React, { useState, useEffect, } from 'react';
import styles from './PasswordStrengthMeter.module.scss';
import {
  PasswordScore, calculateTotalScore, CURRENT_PASSWORD_POLICY,
} from '@/modules/general/libraries/password-helper';

export default function PasswordStrengthMeter({
  score,
  showTitle,
}: {
  score: PasswordScore;
  showTitle?: boolean;
}) {
  const [currentStrength, setCurrentStrength, ] = useState<number>(calculateTotalScore(score, CURRENT_PASSWORD_POLICY));

  useEffect(() => {
    setCurrentStrength(calculateTotalScore(score, CURRENT_PASSWORD_POLICY));
  }, [score, ]);

  const passwordLabel = () => {
    let result = '';
    switch (currentStrength) {
      case 1:
        result = 'Weak';
        break;
      case 2:
        result = 'Weak';
        break;
      case 3:
        result = 'Fair';
        break;
      case 4:
        result = 'Good';
        break;
      case 5:
        result = 'Strong';
        break;
      default:
        result = 'Weak';
        break;
    }
    return result;
  };

  return (
    <>
      {currentStrength ? (
        <div className={styles.root}>
          <div className={styles.root__bar}>
            <div
              data-strength={`${currentStrength}`}
              className={styles.root__bar__strength}
            ></div>
          </div>
          {showTitle && (
            <div className={styles.root__title}>
              {passwordLabel()}
            </div>
          )}
        </div>
      ) : ''}
    </>
  );
}
