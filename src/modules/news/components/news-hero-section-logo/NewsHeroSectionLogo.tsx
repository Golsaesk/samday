
import Image from 'next/image';
import styles from './NewsHeroSectionLogo.module.scss';

const NewsHeroSectionLogo = () => {
  return (
    <div className={styles.root}>
      <Image
        src={`/images/logo/main-logo.svg`}
        alt={''}
        width={543}
        height={63}
        className={styles.root__logo}
      />
    </div>
  );
};

export default NewsHeroSectionLogo;