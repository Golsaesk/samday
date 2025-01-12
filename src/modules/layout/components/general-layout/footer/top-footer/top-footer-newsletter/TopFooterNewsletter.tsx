
import { useState, } from 'react';
import { useSnackbar, } from 'notistack';
import { Typography, } from '@mui/material';
import styles from './TopFooterNewsletter.module.scss';
import { Controller, useForm, } from 'react-hook-form';
import { useLocale, useTranslations, } from 'next-intl';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import { newGuid, } from '@/modules/general/libraries/utils';
import CustomInput from '@/modules/general/components/custom-input';
import CaptchaInput from '@/modules/captcha/components/captcha-input';
import { postNewsletter, } from '@/modules/general/store/api/newsletter-api';
import CheckCircleIcon from '@/modules/general/components/icons/check-circle';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

const TopFooterNewsletter = ({ uniqueId = newGuid(), }: {
  uniqueId?: string;
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
          email: '',
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
        const response = await postNewsletter(
          values.email,
          captchaId,
          captchaValue,
          locale
        );

        if (response && response.data) {
          enqueueSnackbar(t('common.newsletter_success_message'), { variant: 'success', });
        } else {
          enqueueSnackbar(t('common.error'), { variant: 'error', });
        }
        resetFields();

      } catch (error: any) {
        enqueueSnackbar(error.error_message, { variant: 'error', });
        resetFields();
      }
    };

  return (
    <div className={styles.root}>
      <div className={styles.root__description}>
        <CheckCircleIcon />
        <Typography
          variant='subtitle2'
        >
          {t('common.newsletter_description')}
        </Typography>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.root__form}
      >
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
              placeholder={t('common.newsletter_placeholder')}
              dir='ltr'
              value={value}
              className={styles.root__form__input}
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
          name={'captcha'}
          defaultValue=''
          control={control}
          render={({
            field: { onChange, },
            fieldState: { error, },
          }) => {
            return (
              <>
                <CaptchaInput
                  textInputId={'newsletterCaptcha'}
                  className={styles.root__form__captcha}
                  captchaId={captchaId}
                  onCaptchaChange={handleCaptchaChange}
                  onChange={onChange}
                  error={!!error}
                  height={56}
                  helperText={error && error.message}
                  mode={'light'}
                />
              </>
            );
          }}
          rules={{
            required: {
              value: true,
              message: `${t('contact_us.form_required_captcha')}`,
            },
          }}
        />
        <ButtonInput
          type='submit'
          variant='contained'
          endIcon = {<ArrowRightIcon />}
          className={styles.root__form__button}
        >
          {t('common.Membership')}
        </ButtonInput>
      </form>
    </div>
  );
};

export default TopFooterNewsletter;