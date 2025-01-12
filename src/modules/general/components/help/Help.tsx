import Fade from '@mui/material/Fade';
import styles from './Help.module.scss';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@/modules/general/components/icons/help';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@/modules/general/components/icons/close';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import React, {
  ReactNode, useEffect, useState,
} from 'react';

export default function Help({
  dir,
  content,
  disabled,
  title,
}: {
  dir?: string;
  content: ReactNode;
  disabled?: boolean;
  title: string;
}) {
  const
    deviceType = useDeviceType(),
    [open, setOpen,] = useState<boolean>(false),

    handleClose = () => {
      setOpen(false);
    },

    handleOpen = () => {
      if (!disabled) {
        setOpen(true);
      }
    };

  useEffect(() => {
    if (deviceType.isMobile) {
      if (open) {
        document.body.classList.add('noScroll');
      } else {
        document.body.classList.remove('noScroll');

      }
    }
  }, [open,]);

  return (
    <>
      {deviceType.isMobile && open && (
        <div className={`${styles.backdrop} ${open ? styles.backdrop__display : ''}`} />
      )}
      <ClickAwayListener onClickAway={handleClose}>
        <div
          className={styles.root}
          {...deviceType.isScreen && { onMouseEnter: handleOpen, }}
          {...deviceType.isScreen && { onMouseLeave: handleClose, }}
        >
          <IconButton
            aria-label={`${title}`}
            disableRipple
            onClick={handleOpen}
            disabled={disabled}
          >
            <HelpIcon className={dir === 'rtl' ? styles.root__icon__rtl : ''} />
          </IconButton>
          {open && (
            <Fade in={deviceType.isMobile ? true : open}>
              <div className={`${styles.root__popup} ${open ? styles.root__popup__open : ''}`}>
                {deviceType.isMobile && (
                  <>
                    <div
                      onClick={handleClose}
                      className={styles.root__popup__close}
                    >
                      <CloseIcon />
                    </div>
                    <div className={styles.root__popup__title}>
                      {title}
                    </div>
                  </>
                )}
                {content}
              </div>
            </Fade>
          )}
        </div>
      </ClickAwayListener>
    </>
  );
}