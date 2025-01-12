'use client';

import { useState, } from 'react';
import { useTranslations, } from 'next-intl';
import styles from './FeedbackBox.module.scss';
import { useTheme, } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Alert from '@modules/general/components/alert';
import { Controller, useForm, } from 'react-hook-form';
import { newGuid, } from '@modules/general/libraries/utils';
import DialogAlert from '@/modules/general/components/dialog-alert';
import CaptchaInput from '@modules/captcha/components/captcha-input';
import { postFeedback, } from '@modules/general/store/api/feedback-api';
import { AlertStatus, } from '@/modules/general/libraries/general-types';
import TextInput from '@modules/general/components/input-fields/text-input';
import ButtonInput from '@modules/general/components/input-fields/button-input';

export default function FeedbackBox({ uniqueId = newGuid(), }: {
  uniqueId?: string;
}) {

  const
    t = useTranslations(),
    { mode, } = useTheme().palette,
    [message, setMessage,] = useState<string>(''),
    [loading, setLoading,] = useState<boolean>(false),
    [errorText, setErrorText,] = useState<string>(''),
    [captchaId, setCaptchaId,] = useState<string>(uniqueId),
    [captchaValue, setCaptchaValue,] = useState<string>(''),
    [openDialogAlert, setOpenDialogAlert,] = useState<boolean>(false),

    {
      handleSubmit,
      control,
      reset,
    } = useForm({ mode: 'all', }),

    resetFields = () => {
      const newCaptchaId = newGuid();
      setCaptchaId(newCaptchaId);
      reset(
        {
          name: '',
          email: '',
          phone: '',
          description: '',
          captchaId: newCaptchaId,
        },
        { keepDirtyValues: false, });
    },

    handleCaptchaChange = (id: string, captcha: string) => {
      setCaptchaValue(captcha);
      setCaptchaId(id);
    },

    onSubmit = async (values: any) => {
      setLoading(true);

      try {
        setOpenDialogAlert(true);

        const feedbackResponse = await postFeedback(
          t('common.contact_us_form'),
          values.name,
          values.email,
          values.phone,
          values.description,
          captchaId,
          captchaValue
        );

        if (feedbackResponse.status_code === 200) {
          setMessage(t('common.feedback_send_success'));
          setOpenDialogAlert(true);
          setErrorText('');
          resetFields();
        } else {
          setCaptchaId(newGuid());
          setErrorText(t('common.feedback_send_error'));
        }

      } catch (error: any) {
        setCaptchaId(newGuid());
        setErrorText(t('common.feedback_send_error'));
      }
      setLoading(false);
    },

    handleCloseDialogAlert = (status: boolean) => {
      setOpenDialogAlert(status);
    };

  return (
    <>
      {errorText && (
        <Alert
          status={AlertStatus.error}
          description={errorText}
          outlined
          shadow
          className={styles.root__error}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.root__form}
      >
        <div className={styles.root__form__row}>
          <div className={styles.root__form__row__textField}>
            <Controller
              name={'name'}
              control={control}
              defaultValue={''}
              render={({
                field: {
                  onChange,
                  value,
                },
                fieldState: { error, },
              }) => {
                return (
                  <TextInput
                    label={t('common.sender_name')}
                    placeholder={''}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error && error.message}
                    classes={{ root: styles.root__form__row__textField__root, }}
                    id={'name'}
                    autoComplete='name'
                  />
                );
              }}
              rules={{
                required: {
                  value: true,
                  message: `${t('common.sender_name')} ${t('common.not_empty')}`,
                },
              }}
            />
          </div>

        </div>
        <div className={styles.root__form__row}>
          <div className={styles.root__form__row__textField}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({
                field: {
                  onChange,
                  value,
                },
                fieldState: { error, },
              }) => (
                <TextInput
                  label={t('member.email')}
                  id="email"
                  autoComplete='email'
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error && error.message}
                  type="text"
                  className={styles.en}
                  tabIndex={5}
                  fullWidth
                  locale='en'
                  dir='ltr'
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: t('member.empty_field'),
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t('member.email_validation'),
                },
              }}
            />
          </div>
          <div className={styles.root__form__row__textField}>
            <Controller
              name="phone"
              control={control}
              defaultValue={''}
              render={({
                field: {
                  onChange, value, ref,
                }, fieldState: { error, },
              }) => (
                <TextInput
                  fullWidth
                  label={t('common.phone')}
                  id={'phone'}
                  autoComplete='phone'
                  value={value}
                  onChange={onChange}
                  inputRef={ref}
                  locale='en'
                  dir='ltr'
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: `${t('common.phone')} ${t('common.field_required')}`,
                },
                pattern: {
                  value: /[\d]/,
                  message: t('member.mobile_is_number'),
                },
              }}
            />
          </div>
        </div>
        <div className={styles.root__form__row}>
          <div className={styles.root__form__row__textArea}>
            <Controller
              name={'description'}
              control={control}
              defaultValue={''}
              render={({
                field: {
                  onChange, value,
                },
                fieldState: { error, },
              }) => {
                return (
                  <>
                    <TextInput
                      rows={5}
                      multiline
                      value={value}
                      error={!!error}
                      onChange={onChange}
                      label={t('common.feedback_form_description')}
                      helperText={error && error.message}
                      classes={{ root: styles.root__form__row__textArea__root, }}
                      fullWidth
                      id={"description"}
                      autoComplete='description'
                    />
                  </>
                );
              }}
              rules={{
                required: {
                  value: true,
                  message: `${t('common.feedback_form_description')} ${t('common.not_empty')}`,
                },
              }}
            />
          </div>
        </div>
        <div className={`${styles.root__form__row} ${styles.root__form__actions}`}>
          <div className={styles.root__form__row__captcha}>
            <Controller
              name={'feedbackCaptcha'}
              defaultValue=''
              control={control}
              render={({
                field: { onChange, },
                fieldState: { error, },
              }) => {
                return (
                  <>
                    <CaptchaInput
                      textInputId={'feedbackCaptcha'}
                      captchaId={captchaId}
                      onCaptchaChange={handleCaptchaChange}
                      onChange={onChange}
                      error={!!error}
                      height={56}
                      className={styles.root__form__row__captcha__Image}
                      mode={mode}
                      placeholder={t('common.captcha_placeholder')}
                    />
                    {error && (
                      <Typography className={styles.root__form__row__captcha__error}>
                        {error.message}
                      </Typography>
                    )}
                  </>
                );
              }}
              rules={{
                required: {
                  value: true,
                  message: `${t('common.feedback_form_captcha_error')}`,
                },
              }}
            />
          </div>
          <div>
            <ButtonInput
              type="submit"
              loading={loading}
              variant="contained"
              fullWidth
            >
              {t('common.send')}
            </ButtonInput>
          </div>
        </div>
      </form>
      {!errorText && (
        <DialogAlert
          message={message}
          showOkButton
          isOpen={openDialogAlert}
          handleCloseDialog={handleCloseDialogAlert}
        />
      )}
    </>
  );
}
