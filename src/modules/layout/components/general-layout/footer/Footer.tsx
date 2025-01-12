
import TopFooter from './top-footer';
import styles from './Footer.module.scss';
import BottomFooter from './bottom-footer';

const Footer = () => {
  return (
    <div className={styles.root}>
      <TopFooter />
      <BottomFooter />
    </div>
  );
};

export default Footer;