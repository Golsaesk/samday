'use client';

import styles from './Contact.module.scss';
import { useTranslations, } from 'use-intl';
import Panel from '@/modules/general/components/panel';
import ContactForm from '@/modules/contact/components/contact-form';
import ContactInfo from '@/modules/contact/components/contact-info';

const Contact = () => {
  const
    t = useTranslations();

  return (
    <div className={styles.root}>
      <Panel
        variant='general'
      >
        <div className={styles.root__title}>
          {t('contact_us.contact_title')}
        </div>
        <div className={styles.root__container}>
          <ContactForm className={styles.root__container__form} />
          <ContactInfo className={styles.root__container__info} />
        </div>
      </Panel>
    </div>
  );
};

export default Contact;