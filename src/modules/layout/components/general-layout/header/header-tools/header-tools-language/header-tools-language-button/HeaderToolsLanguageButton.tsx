
import styles from './HeaderToolsLanguageButton.module.scss';

const HeaderToolsLanguageButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {

  return (
    <div
      className={styles.root}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default HeaderToolsLanguageButton;