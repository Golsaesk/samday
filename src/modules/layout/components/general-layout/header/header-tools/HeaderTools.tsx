
import styles from './HeaderTools.module.scss';
import HeaderToolsSearch from './header-tools-search';
import HeaderToolsLanguage from './header-tools-language';

const HeaderTools = () => {

  return (
    <div className={styles.root}>
      <HeaderToolsSearch className={styles.root__search} />
      <HeaderToolsLanguage className={styles.root__language} />
    </div>
  );
};

export default HeaderTools;