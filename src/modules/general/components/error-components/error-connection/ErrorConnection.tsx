
import Image from 'next/image';
import { useTranslations, } from 'next-intl';
import Typography from '@mui/material/Typography';
import styles from './ErrorConnection.module.scss';
import { DOMAIN, } from '@/modules/general/libraries/constants';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

export default function ErrorConnection({
  variant = 'general',
  className = '',
  noScroll = true,
  description,
  url,
  title,
  errorButtonTitle,
}: {
  variant?: 'card' | 'general';
  className?: string;
  noScroll?: boolean;
  description?: string;
  url?: string;
  title?: string;
  errorButtonTitle?: string;
}) {
  const t = useTranslations();

  if (noScroll) {
    document.body.classList.add('noScroll');
  }

  return (
    <div className={`${styles.root} variant_${variant} ${className}`}>
      <Image
        src={`${DOMAIN}/images/general/email-not-confirmed.svg`}
        width={147}
        height={132}
        alt={''}
      />
      <div className={styles.root__content}>
        <Typography variant={'h5'}>
          {title || t('common.load_error_title')}
        </Typography>
        <Typography variant={'body1'}>
          {description ? (
            <>
              {description}
            </>
          ) : (
            <>
              {t('common.load_error_description')}
            </>
          )}
        </Typography>
        <ButtonInput
          variant={'outlined'}
          {...url && { href: url, }}
          {...!url && {
            onClick: () => {
              window.location.reload();
            },
          }}
        >
          {errorButtonTitle || t('common.load_error_reload')}
        </ButtonInput>
      </div>
    </div>
  );
}