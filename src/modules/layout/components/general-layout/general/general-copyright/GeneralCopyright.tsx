
import { Typography, } from '@mui/material';
import { useTranslations, } from 'next-intl';
import styles from './GeneralCopyright.module.scss';

const GeneralCopyright = ({
  className,
  isFooter = false,
}: {
  className?: string;
  isFooter?: boolean;
}) => {
  const
    t = useTranslations();

  return (
    <div className={`${styles.root} ${className ? className : ''}`}>
      <Typography
        variant='tiny'
        className={styles.root__text}
      >
        {/* <CopyrightIcon /> */}
       &copy; {t('common.copyright')} {isFooter && t('common.copyright_description')}
      </Typography>
    </div>
  );
};
export default GeneralCopyright;