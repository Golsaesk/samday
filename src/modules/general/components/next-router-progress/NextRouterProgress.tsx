'use client';
import Router from 'next/router';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState, } from 'react';
import styles from './NextRouterProgress.module.scss';

export default function NextRouterProgress({
  stopDelayMs = 200,
  showOnShallow = true,
}: {
  startPosition?: number;
  stopDelayMs?: number;
  showOnShallow?: boolean;
  nonce?: string;
}) {
  let timer: NodeJS.Timeout | null = null;
  const [isActive, setIsActive, ] = useState(false);

  const routeChangeStart = (
    _: string,
    { shallow, }: {
      shallow: boolean;
    }
  ) => {
    if (!shallow || showOnShallow) {
      setIsActive(true);
    }
  };

  const routeChangeEnd = (
    _: string,
    { shallow, }: {
      shallow: boolean;
    }
  ) => {
    if (!shallow || showOnShallow) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setIsActive(false);
      }, stopDelayMs);
    }
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  }, []);

  return (
    <div className={styles.root}>
      {isActive && (
        <LinearProgress />
      )}
    </div>
  );
}
