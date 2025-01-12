import { LocaleType, } from '@/modules/general/libraries/constants';
import GeneralLayoutDataEn from '@/modules/layout/components/general-layout/general/general-data/general-data-En';
import GeneralLayoutDataFa from '@/modules/layout/components/general-layout/general/general-data/general-data-fa';

const getLayoutData = (locale: string) => {
  let data;
  switch (locale) {
    case LocaleType.fa:
      data = GeneralLayoutDataFa;
      break;
    case LocaleType.en:
      data = GeneralLayoutDataEn;
      break;
    default:
      break;
  }
  return data;
};

export default getLayoutData;