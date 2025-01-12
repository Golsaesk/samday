import {
  Accordion, AccordionDetails, AccordionSummary,
} from '@mui/material';
import styles from './NewsDetailSidebar.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import PlusIcon from '@/modules/general/components/icons/plus';
import MinusIcon from '@/modules/general/components/icons/minus';
import { useState, } from 'react';

const NewsDetailSidebar = ({
  tags,
  base,
  className,
}: {
  tags: string[] | null | undefined;
  base: string;
  className?: string;
}) => {
  const t = useTranslations(),
    locale = useLocale(),

    hasAlphabet = (tag: string): boolean => {
      const alphabetRegex = /[A-Za-z\u0600-\u06FF]/;
      return alphabetRegex.test(tag);
    },

    filteredTags = tags?.filter(tag => hasAlphabet(tag));
  const [expanded, setExpanded,] = useState<boolean>(false);

  const handleChange = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <Accordion expanded={expanded} onChange={handleChange} className={styles.root__accordion}>
        <AccordionSummary
          expandIcon={expanded ? <MinusIcon /> : <PlusIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={styles.root__accordion__listSubheader}
        >
          {t('news.related_category')}
        </AccordionSummary>
        <AccordionDetails className={styles.root__accordion__list}>
          {filteredTags?.map((tag: string, index: number) => (
            <a
              key={index}
              title={tag}
              href={`/${locale}/${base}?tags=${encodeURIComponent(tag)}`}
            >
              {tag}
            </a>
          ))}
        </AccordionDetails>
      </Accordion>

    </div>
  );
};

export default NewsDetailSidebar;
