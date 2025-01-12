import React from 'react';
import { useTranslations, } from 'next-intl';
import styles from './TableLegend.module.scss';
import Typography from '@mui/material/Typography';
import Card from '@/modules/general/components/card-components/card';
import { TableLegendClassType, TableLegendItemType, } from '@/modules/general/libraries/general-types';

export default function TableLegend({
  legendItemList,
  classes,
}: {
  legendItemList: TableLegendItemType[];
  classes?: TableLegendClassType;
}) {
  const t = useTranslations();

  return (
    <>
      {legendItemList && legendItemList.length > 0 && (
        <Card
          fullMobileWidth
          className={`${styles.root} ${classes?.root ?? ''}`}
        >
          <Typography
            variant={'subtitle2'}
            className={`${styles.root__title} ${classes?.header ?? ''}`}
          >
            {t('common.table_tool_title')}
          </Typography>
          <div className={`${styles.root__marks} ${classes?.markList ?? ''}`}>
            {legendItemList.map((item: TableLegendItemType) => {
              return (
                <div
                  key={Math.random()}
                  className={`${styles.root__marks__item} ${classes?.markItem ?? ''}`}
                >
                  {item.icon}
                  {item.title}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );
}