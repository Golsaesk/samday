import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useTranslations, } from 'next-intl';
import styles from './DialogAlert.module.scss';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { renderHTML, } from '@modules/general/libraries/utils';
import { useDeviceType, } from '@modules/general/libraries/device-type';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ButtonInput from '@modules/general/components/input-fields/button-input';
import { TransitionDialogUp, } from '@/modules/general/components/transition-dialog/TransitionDialog';

export default function DialogAlert({
  message,
  title,
  showOkButton = false,
  okButtonText,
  isOpen,
  handleCloseDialog,
  fullWidthButton = true,
  showAlertIcon = false,
}: {
  message: string;
  title?: string;
  showOkButton: boolean;
  okButtonText?: string;
  isOpen: boolean;
  handleCloseDialog: any;
  fullWidthButton?: boolean;
  showAlertIcon?: boolean;
}) {
  const
    t = useTranslations(),
    deviceType = useDeviceType();

  return (
    <>
      {message && (
        <Dialog
          {...deviceType.isMobile && { TransitionComponent: TransitionDialogUp, }}
          fullScreen={deviceType.isMobile}
          open={isOpen}
          onClose={() => handleCloseDialog(false)}
          aria-labelledby={title || 'title'}
          aria-describedby={message}
          classes={{ paper: styles.root__paper, }}
        >
          {title && (
            <DialogTitle id="alert-dialog-title">
              {title}
            </DialogTitle>
          )}
          <DialogContent className={styles.root__messageWrapper}>
            {showAlertIcon && (
              <div className={styles.root__messageWrapper__iconWrapper}>
                <CircleNotificationsIcon fontSize='large' />
              </div>
            )}
            <span className={styles.root__messageWrapper__message}>
              {renderHTML(message)}
            </span>
          </DialogContent>
          {showOkButton && (
            <DialogActions className={styles.root__buttons}>
              <ButtonInput
                fullWidth={fullWidthButton || deviceType.isMobile}
                variant='contained'
                onClick={() => handleCloseDialog(false)}
              >
                {okButtonText || t('common.ok')}
              </ButtonInput>
            </DialogActions>
          )}
        </Dialog>
      )}
    </>
  );
}
