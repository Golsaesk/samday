
import styles from './BottomFooter.module.scss';
import Panel from '@/modules/general/components/panel/Panel';
import GeneralCopyright from '@/modules/layout/components/general-layout/general/general-copyright';
import GeneralSocialMedia from '@/modules/layout/components/general-layout/general/general-social-media';

export default function BottomFooter() {

  return (
    <div className={styles.root}>
      <Panel
        variant='general'
        classes={{ root: styles.root__container, }}
      >
        <div className={styles.root__container__wrapper}>
          <GeneralCopyright
            isFooter
          />
          <GeneralSocialMedia />
        </div>
      </Panel>
    </div>
  );
}