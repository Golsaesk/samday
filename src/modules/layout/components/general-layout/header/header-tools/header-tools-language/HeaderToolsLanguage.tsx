
import { useLocale, } from 'use-intl';
import styles from './HeaderToolsLanguage.module.scss';
import { LanguageType, } from '@/modules/layout/libraries/constants';
import HeaderToolsLanguageButton from './header-tools-language-button';

const HeaderToolsLanguage = ({ className, }: {className?: string}) => {
  const
    locale = useLocale(),
    changeLanguageHandler = (lang: string) => {
      if (lang === 'en') {
        window.location.href = '/en';

      } else {
        window.location.href = '/';
      }
    };

  return (
    <div className={`${styles.root} ${className ? className : ''}`}>
      {locale === 'fa' && (
        <HeaderToolsLanguageButton
          label={LanguageType.en}
          onClick={() => changeLanguageHandler('en')}
        />
      )}
      {locale === 'en' && (
        <HeaderToolsLanguageButton
          label={LanguageType.fa}
          onClick={() => changeLanguageHandler('fa')}
        />
      )}
    </div>
  );
};

export default HeaderToolsLanguage;