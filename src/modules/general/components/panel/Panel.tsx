import styles from './Panel.module.scss';
import { getVariantStyle, } from '@/modules/general/libraries/utils';
import { PanelProps, } from '@/modules/general/libraries/general-types';

export default function Panel({
  title,
  classes,
  variant,
  children,
  fullMobileWidth,
  headerFrontSide,
}: PanelProps) {
  return (
    <div className={`${
      getVariantStyle(styles, variant)} ${
      styles.root} ${classes?.root ?? ''} ${
      fullMobileWidth ? styles.root__fullMobileWidth : ''}`}
    >
      {headerFrontSide ?
        (
          <div className={styles.root__header}>
            {title && (
              <h1 className={`${
                styles.root__title} ${
                classes?.title ?? ''} ${
                fullMobileWidth ? styles.root__title__padding : ''}`}
              >
                {title}
              </h1>
            )}
            {headerFrontSide}
          </div>
        ) : (
          <>
            {title && (
              <h1 className={`${
                styles.root__title} ${
                classes?.title ?? ''} ${
                fullMobileWidth ? styles.root__title__padding : ''}`}
              >
                {title}
              </h1>
            )}
          </>
        )}
      {children}
    </div>
  );
}