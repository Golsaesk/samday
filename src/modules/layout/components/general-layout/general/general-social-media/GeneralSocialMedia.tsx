
import Link from 'next/link';
import styles from './GeneralSocialMedia.module.scss';
import { SocialMediaItem, } from '@/modules/layout/libraries/layout-types';
import GeneralLayoutDataFa from '@/modules/layout/components/general-layout/general/general-data/general-data-fa';

const GeneralSocialMedia = () => {

  return (
    <>
      {GeneralLayoutDataFa.socialMedia && (
        <div className={styles.root}>
          {GeneralLayoutDataFa.socialMedia.data.map((socialMedia: SocialMediaItem, index: number) => (
            <Link
              key={`social-media-${index}`}
              href={socialMedia.link}
              className={styles.root__item}
              target='_blank'
            >
              {socialMedia.icon}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default GeneralSocialMedia;