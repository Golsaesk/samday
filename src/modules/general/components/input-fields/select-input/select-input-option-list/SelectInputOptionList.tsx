import { useTranslations, } from 'next-intl';
import React, { useEffect, useState, } from 'react';
import styles from './SelectInputOptionList.module.scss';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@/modules/general/components/icons/search';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import { Direction, SelectInputOptionType, } from '@/modules/general/libraries/general-types';
import {
  Collapse, CollapseProps, InputBase,
} from '@mui/material';

export default function SelectInputOptionList({
  open,
  onChange,
  options,
  onClose,
  label,
  collapseProps,
  value,
  searchable,
  dir,
  searchPlaceholder,
  className,
  defaultValueClickable = true,
}: {
  open: boolean;
  onChange: any;
  options: SelectInputOptionType[];
  onClose?: any;
  label?: string;
  collapseProps?: CollapseProps;
  value?: any;
  searchable?: boolean;
  dir?: Direction;
  searchPlaceholder?: string;
  className?: string;
  defaultValueClickable?: boolean;
}
) {
  const
    deviceType = useDeviceType(),
    t = useTranslations(),
    [keyword, setKeyword,] = useState(""),
    [list, setList,] = useState(options),

    handleSelect = (item: SelectInputOptionType) => {
      onChange(item);
    };

  useEffect(() => {
    if (keyword) {
      let searchList = options.filter((item: SelectInputOptionType) => item.label.toLowerCase().indexOf(keyword) > -1);
      const exactMatchIndex = searchList.findIndex((item: SelectInputOptionType) => item.label.toLowerCase() === keyword);
      const exactMatchOption = searchList.find((item: SelectInputOptionType) => item.label.toLowerCase() === keyword);

      if (exactMatchIndex > -1 && exactMatchOption) {
        searchList.splice(exactMatchIndex, 1);
        searchList.unshift(exactMatchOption);
      }

      setList(searchList);
    } else {
      setList(options);
    }

  }, [keyword,]);

  useEffect(() => {
    setList(options);
  }, [options,]);

  return (
    <div className={`${styles.root} ${className ? className : ""} ${open ? styles.root__open : ''}`}>
      <Collapse
        {...collapseProps}
        in={open}
        classes={{
          root: `${collapseProps?.classes?.root ?? ''} ${styles.root__collapse}`,
          wrapperInner: `${collapseProps?.classes?.wrapperInner ?? ''} ${styles.root__collapse__innerWrapper}`,
          ...collapseProps?.classes,
        }}
      >
        {deviceType.isMobile && (
          <div className={styles.root__collapse__header}>
            {label ? label : options[0].label}
            <div
              onClick={onClose}
              className={styles.root__collapse__header__close}
            >
              <CloseRoundedIcon />
            </div>
          </div>
        )}
        <div className={styles.root__collapse__list}>
          {searchable ? (
            <div
              {...dir && { dir: dir, }}
              className={styles.root__collapse__list__search}
            >
              <InputBase
                value={keyword}
                onChange={(e) => {
                  e.preventDefault();
                  setKeyword(e.target.value);
                }
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSelect(list[0]);
                  }
                }}
                placeholder={searchPlaceholder || t('common.search')}
                endAdornment={<SearchIcon />}
              />
            </div>
          ) : (
            <></>
          )}
          <div className={styles.root__collapse__list__wrapper}>
            {list.map((option: SelectInputOptionType, index: number) => {
              return (
                <div
                  key={Math.random()}
                  onClick={defaultValueClickable ? () => handleSelect(option) : index === 0 ? undefined : () => handleSelect(option)}
                  style={{ direction: `${option.dir || 'rtl'}`, }}
                  className={`${styles.root__collapse__list__wrapper__item} ${JSON.stringify(option.value) === JSON.stringify(value) ? styles.root__collapse__list__wrapper__item__active : ''}`}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      </Collapse>
    </div>
  );
}