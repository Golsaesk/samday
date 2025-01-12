'use client';

import { useState, } from 'react';
import { useLocale, } from 'next-intl';
import { useSnackbar, } from 'notistack';
import { useTranslations, } from 'use-intl';
import styles from './ContactForm.module.scss';
import { Controller, useForm, } from 'react-hook-form';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import { newGuid, } from '@/modules/general/libraries/utils';
import { LocaleType, } from '@/modules/general/libraries/constants';
import CustomInput from '@/modules/general/components/custom-input';
import CaptchaInput from '@/modules/captcha/components/captcha-input';
import { postFeedback, } from '@/modules/general/store/api/feedback-api';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

const ContactForm = ({
  uniqueId = newGuid(),
  className,
}: {
  uniqueId?: string;
  className: string;
}) => {
  const
    t = useTranslations(),
    locale = useLocale(),
    { enqueueSnackbar, } = useSnackbar(),
    [captchaId, setCaptchaId,] = useState<string>(uniqueId),
    [captchaValue, setCaptchaValue,] = useState<string>(''),
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
          firstName: '',
          lastName: '',
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
      try {
        const feedbackResponse = await postFeedback(
          t('common.contact_us_form'),
          `${values.firstName} ${values.lastName}`,
          values.email,
          values.phone,
          values.description,
          captchaId,
          captchaValue
        );

        if (feedbackResponse.status_code === 200) {
          enqueueSnackbar(t('common.feedback_send_success'), { variant: 'success', });
        } else {
          enqueueSnackbar(t('common.feedback_send_error'), { variant: 'error', });
        }
        resetFields();

      } catch (error: any) {
        enqueueSnackbar(error.error_message, { variant: 'error', });
        resetFields();
      }
    };

  return (
    <div className={`${styles.root} ${className ? className : ''}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.root__form}
      >
        <Controller
          name="firstName"
          control={control}
          defaultValue={''}
          render={({
            field: {
              onChange, value,
            }, fieldState: { error, },
          }) => (
            <CustomInput
              label={t('common.firstname')}
              placeholder={t('contact_us.name_placeholder')}
              value={value}
              dir={locale === LocaleType.en ? 'ltr' : 'rtl'}
              onChange={onChange}
              helperText={error && error.message}
              autoFocus
            />
          )}
          rules={{
            required: {
              value: true,
              message: `${t('contact_us.form_required_firstname')}`,
            },
          }}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue={''}
          render={({
            field: {
              onChange, value,
            }, fieldState: { error, },
          }) => (
            <CustomInput
              label={t('common.lastname')}
              placeholder={t('contact_us.lastname_placeholder')}
              value={value}
              dir={locale === LocaleType.en ? 'ltr' : 'rtl'}
              onChange={onChange}
              helperText={error && error.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: `${t('contact_us.form_required_lastname')}`,
            },
          }}
        />
        <Controller
          name="email"
          control={control}
          defaultValue={''}
          render={({
            field: {
              onChange, value,
            }, fieldState: { error, },
          }) => (
            <CustomInput
              label={t('common.email')}
              placeholder={t('contact_us.email_placeholder')}
              dir='ltr'
              value={value}
              onChange={onChange}
              helperText={error && error.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: `${t('contact_us.form_required_email')}`,
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('contact_us.email_validation'),
            },
          }}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue={''}
          render={({
            field: {
              onChange, value,
            }, fieldState: { error, },
          }) => (
            <CustomInput
              label={t('common.tel')}
              placeholder={t('contact_us.tel_placeholder')}
              dir='ltr'
              value={value}
              onChange={onChange}
              helperText={error && error.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: `${t('contact_us.form_required_phone')}`,
            },
            pattern: {
              value: /[\d]/,
              message: t('contact_us.mobile_is_number'),
            },
          }}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={''}
          render={({
            field: {
              onChange, value,
            }, fieldState: { error, },
          }) => (
            <CustomInput
              label={t('contact_us.form_description_label')}
              placeholder={t('contact_us.description_placeholder')}
              multiline
              value={value}
              dir={locale === LocaleType.en ? 'ltr' : 'rtl'}
              onChange={onChange}
              helperText={error && error.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: `${t('contact_us.form_required_message')}`,
            },
          }}
        />
        <Controller
          name={'captcha'}
          defaultValue=''
          control={control}
          render={({
            field: { onChange, },
            fieldState: { error, },
          }) => (
            <CaptchaInput
              textInputId={'contactCaptcha'}
              captchaId={captchaId}
              onCaptchaChange={handleCaptchaChange}
              onChange={onChange}
              error={!!error}
              height={56}
              className={styles.root__form__captcha}
              helperText={error && error.message}
              mode={'light'}
              placeholder={t('common.captcha_placeholder')}
            />
          )}
          rules={{
            required: {
              value: true,
              message: `${t('contact_us.form_required_captcha')}`,
            },
          }}
        />
        <div className={styles.root__action}>
          <ButtonInput
            type='submit'
            variant='contained'
            endIcon = {<ArrowRightIcon />}
            className={styles.root__button}
          >
            {t('common.send')}
          </ButtonInput>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;